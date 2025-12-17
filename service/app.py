from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

@app.route('/clean', methods=['POST'])
def clean_data():
    data = request.json

    # Limpieza básica
    cliente = data.get('cliente', '').strip().title()
    email = data.get('email', '').strip().lower()
    producto = data.get('producto', '').strip().title()
    categoria = data.get('categoria', '').strip().lower()

    cantidad = int(data.get('cantidad', 0))
    if cantidad <= 0:
        return jsonify({"error": "Cantidad inválida"}), 400
    precio = float(data.get('precio', 0))
    if precio <= 0:
        return jsonify({"error": "Precio inválido"}), 400

    fecha_raw = data.get('fecha', '')
    total = cantidad * precio

    cleaned_data = {
        'cliente': cliente,
        'email': email,
        'producto': producto,
        'categoria': categoria,
        'cantidad': cantidad,
        'precio_unitario': precio,
        'fecha': fecha_raw,
        'total': total
    }

    return jsonify(cleaned_data), 200

if __name__ == '__main__':
    print("\n**** Service running on port 5002 ****\n")
    app.run(port=5002, debug=True)