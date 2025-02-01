from .user_routes import user_routes
from .farmer_routes import farmer_routes
from .supplier_routes import supplier_routes
from config.config2 import create_app

app = create_app()

__all__ = ["user_routes", "farmer_routes", "supplier_routes"]
