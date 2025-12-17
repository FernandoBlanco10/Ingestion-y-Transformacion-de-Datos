export function validateInput(data) {
    const requiredFields = [
        'cliente',
        'email',
        'producto',
        'fecha',
        'cantidad',
        'precio'
    ];

    for (const field of requiredFields) {
        if (!data[field]) {
            return 'Campo obligatorio faltante: ' + field;
        }
    }

    return null;
}