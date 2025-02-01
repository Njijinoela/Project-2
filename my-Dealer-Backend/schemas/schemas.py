from config.config2 import ma
from models.models import User, Farmer, Supplier, Product
from marshmallow import validates, ValidationError, fields, validate

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_relationships = True
        load_instance = True
        exclude = ('password_hash', 'is_deleted', 'deleted_at')  # Hide sensitive/internal fields
    
    # Add password field for input only
    password = fields.String(load_only=True, required=True)
    
    # Add nested relationships with proper exclusions
    farmer = ma.Nested('FarmerSchema', exclude=("user",))
    supplier = ma.Nested('SupplierSchema', exclude=("user",))

    @validates('email')
    def validate_email(self, email):
        if not User.is_valid_email(email):
            raise ValidationError('Invalid email format')

    @validates('phone')
    def validate_phone(self, phone):
        if not User.is_valid_phone(phone):
            raise ValidationError('Phone number must be 10 digits')

    @validates('password')
    def validate_password(self, password):
        if not User.is_valid_password(password):
            raise ValidationError(
                'Password must be at least 8 characters and contain at least '
                'one uppercase letter, one lowercase letter, and one number'
            )

class FarmerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Farmer
        include_relationships = True
        load_instance = True
        exclude = ('is_deleted', 'deleted_at')  # Hide internal fields
    
    user = ma.Nested('UserSchema', exclude=("farmer",))

    @validates('farm_name')
    def validate_farm_name(self, farm_name):
        if not farm_name or len(farm_name.strip()) < 2:
            raise ValidationError('Farm name must be at least 2 characters long')

class SupplierSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Supplier
        include_relationships = True
        load_instance = True
        exclude = ('is_deleted', 'deleted_at')  # Hide internal fields
    
    user = ma.Nested('UserSchema', exclude=("supplier",))

    @validates('company_name')
    def validate_company_name(self, company_name):
        if not company_name or len(company_name.strip()) < 2:
            raise ValidationError('Company name must be at least 2 characters long')

class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product
        load_instance = True

    id = fields.Int(dump_only=True)
    product_name = fields.Str(required=True, validate=validate.Length(min=1, max=250))
    price = fields.Float(required=True)
    phone = fields.Str(required=True, validate=validate.Length(equal=10))
    description = fields.Str(required=True)
    location = fields.Str(required=True)
    farm_name = fields.Str(required=True)
    farmer_id = fields.Int(required=True)
    image_url = fields.Str(dump_only=True)


# Schema instances
user_schema = UserSchema()
farmer_schema = FarmerSchema()
supplier_schema = SupplierSchema()
users_schema = UserSchema(many=True)
farmers_schema = FarmerSchema(many=True)
suppliers_schema = SupplierSchema(many=True)
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

