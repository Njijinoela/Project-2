from flask import Blueprint, request, jsonify
from models.models import db, Product  # Ensure you're importing db & Product correctly

# Define the Blueprint
product_bp = Blueprint("product_bp", __name__)

# Example route to test
@product_bp.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@product_bp.route("/products", methods=["POST"])
def add_product():
    try:
        data = request.get_json()  # Ensure JSON is received

        # Validate required fields (without farmer_id)
        required_fields = ["product_name", "price", "phone", "image_url", "description", "location", "farm_name"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Create new Product (without farmer_id)
        new_product = Product(
            product_name=data["product_name"],
            price=float(data["price"]),
            phone=data["phone"],
            image_url=data["image_url"],
            description=data["description"],
            location=data["location"],
            farm_name=data["farm_name"],
        )

        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.to_dict()), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400  # Return error response