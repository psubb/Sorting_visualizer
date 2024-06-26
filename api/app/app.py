import logging
from app import create_app

logging.basicConfig(level=logging.DEBUG)
app = create_app()

if __name__ == "__main__":
    logging.debug("Starting Flask app...")
    app.run(host="0.0.0.0", port=5000)
