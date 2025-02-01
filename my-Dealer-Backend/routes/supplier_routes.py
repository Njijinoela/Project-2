from flask import jsonify, request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from config.config2 import create_app, db
from models.models import User,Supplier
from schemas.schemas import (
    supplier_schema, suppliers_schema
)

supplier_routes = Blueprint('supplier_routes', __name__)
# Supplier routes
@supplier_routes.route('/suppliers', methods=['GET'])
@jwt_required()
def get_suppliers():
    try:
        suppliers = Supplier.query.all()
        return suppliers_schema.jsonify(suppliers), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@supplier_routes.route('/suppliers/<int:supplier_id>', methods=['GET'])
@jwt_required()
def get_supplier(supplier_id):
    try:
        supplier = Supplier.query.get(supplier_id)
        if supplier is None:
            return jsonify({"error": "Supplier not found"}), 404
        return supplier_schema.jsonify(supplier), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@supplier_routes.route('/suppliers', methods=['POST'])
@jwt_required()
def add_supplier():
    try:
        current_user = get_jwt_identity()
        user_id = request.json['user_id']
        
        if current_user != user_id:
            return jsonify({"error": "Unauthorized"}), 403
            
        company_name = request.json['company_name']
        address = request.json.get('address', None)

        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        new_supplier = Supplier(user_id=user_id, company_name=company_name, address=address)
        db.session.add(new_supplier)
        db.session.commit()

        return supplier_schema.jsonify(new_supplier), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
