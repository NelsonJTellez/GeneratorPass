(function() {
    const app = document.getElementById('app');
    const inputCaracteres = document.getElementById('numero-caracteres');
    const rangoCaracteres = document.getElementById('rango-caracteres');
    const caracteres = {
      numeros: '0 1 2 3 4 5 6 7 8 9',
      simbolos: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /',
      mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
      minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    };
  
    const configuracion = {
      caracteres: parseInt(inputCaracteres.value, 10) || 16,
      simbolos: false,
      numeros: false,
      mayusculas: false,
      minusculas: false,
    };
  
    const toggleButtonState = (button, state) => {
      button.classList.toggle('active', state);
      const icon = button.querySelector('i');
      icon.classList.toggle('check', state);
      icon.classList.toggle('times', !state);
      configuracion.minusculas = true;
    };
  
    const actualizarConfiguracion = (propiedad) => {
      configuracion[propiedad] = !configuracion[propiedad];
      toggleButtonState(document.getElementById(`btn-${propiedad}`), configuracion[propiedad]);
    };
  
    const generarPassword = () => {
      const caracteresFinales = Object.keys(configuracion)
        .filter(prop => configuracion[prop])
        .map(prop => caracteres[prop])
        .join(' ')
        .split(' ');
  
      const password = Array.from({ length: configuracion.caracteres }, () =>
        caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)]
      ).join('');
  
      document.getElementById('input-password').value = password;
    };
  
    const copiarPassword = () => {
      const input = document.getElementById('input-password');
      input.select();
      document.execCommand("copy");
      const alerta = document.getElementById('alerta-copiado');
      alerta.classList.add('active');
      setTimeout(() => alerta.classList.remove('active'), 2000);
    };
  
    app.addEventListener('submit', e => e.preventDefault());
    rangoCaracteres.addEventListener('input', () => {
      configuracion.caracteres = parseInt(rangoCaracteres.value, 10);
      inputCaracteres.value = configuracion.caracteres;
    });
  
    ['simbolos', 'numeros', 'mayusculas'].forEach(prop => {
      document.getElementById(`btn-${prop}`).addEventListener('click', () => actualizarConfiguracion(prop));
    });
  
    document.getElementById('btn-generar').addEventListener('click', generarPassword);
    document.getElementById('input-password').addEventListener('click', copiarPassword);
  
    // Generar una password con la configuración por defecto al cargar la página
    generarPassword();
  })();
