

# Bienvenido a KC Chat Real Time

**[KC Chat Real Time](https://kc-front-one.vercel.app/#/)** es una aplicación diseñada para facilitar la conexión entre amigos y comunidades. Permite crear y unirse a grupos, chatear en tiempo real, y personalizar completamente tu perfil. Ofrece un control total sobre tu información y privacidad, además de configuraciones avanzadas que permiten ajustar la experiencia a tus preferencias. La plataforma está pensada para brindar una experiencia única, e incluso cuenta con un **easter egg** para sorprender a los usuarios más curiosos.

## Características

-   **Notificaciones y Conexión Instantánea**: Cuando el usuario A agrega al usuario B como amigo, B recibe una notificación en tiempo real y se establece una conexión automática entre ambos para chatear sin necesidad de recargar la página. Esto se logra mediante `socket.io`, que asegura la sincronización en tiempo real.
    
-   **Manejo de Errores en Conexiones Simultáneas**: Si el usuario A agrega al usuario C dos veces desde diferentes pestañas del navegador, el sistema maneja el error y conecta ambas instancias del navegador al mismo chat, garantizando una experiencia fluida y sin interrupciones.
    
-   **Experiencia Personalizada sin Amigos o Chats**: Si un usuario no tiene amigos, chats o grupos, se muestra una interfaz personalizada que lo invita a agregar amigos, crear grupos o unirse a uno público. Cada sección (amigos, chats, grupos, entre otros) incluye un animal único para los mensajes, brindando una experiencia amigable y creativa, incluso en casos de fallos o errores inesperados.
    
-   **Validación de Identidad para Modificar o Eliminar la Cuenta**: Para mayor seguridad, el usuario debe validar su identidad mediante su contraseña antes de realizar cambios en su cuenta o eliminarla. Si el usuario creó su cuenta con Google, puede validar su identidad utilizando Google OAuth. Al eliminar la cuenta, toda la información del usuario, incluidos grupos, chats y mensajes asociados, se elimina completamente de la base de datos.
    
-   **Sesión de Usuario de 24 Horas**: Las sesiones de usuario tienen una duración de 24 horas. Después de este periodo, el usuario deberá volver a iniciar sesión para continuar utilizando la aplicación.
    
-   **Búsqueda Fácil de Amigos y Grupos**: Los usuarios pueden buscar amigos fácilmente por su apodo al agregarlos. En los grupos, existe un filtro doble que permite buscar tanto por nombre como por categoría, facilitando la navegación y el descubrimiento de nuevos grupos.
    
-   **División de Chats**: La interfaz de chats está dividida en dos secciones principales:
    
    -   **Mensajes de Amigos**: Chats individuales con amigos, ordenados por el último mensaje enviado o recibido.
    -   **Chats de Grupos**: Divididos por grupos, donde cada grupo muestra sus propios chats, permitiendo al usuario seleccionar el grupo y chat en el que desea participar.
-   **Organización de Mensajes**: Los mensajes dentro de los chats están organizados por el último mensaje enviado o recibido, manteniendo siempre visible la conversación más reciente para facilitar el acceso a las interacciones activas.
    
-   **Traducciones Dinámicas**: La aplicación soporta múltiples idiomas utilizando `react-i18next`. Las traducciones se basan en la configuración establecida por el usuario, pero si es un nuevo usuario, se toma el idioma del navegador. Los usuarios pueden cambiar manualmente el idioma en la configuración. Actualmente, la aplicación soporta Inglés, Español y Gallego.
    
-   **Modo Claro/Oscuro Automático**: El modo claro u oscuro se ajusta automáticamente según las preferencias del usuario. Si no se han establecido preferencias, se utiliza la configuración del sistema operativo o navegador. Si el usuario no tiene una preferencia explícita, la aplicación sigue el sistema por defecto.
    
-   **Creación de Grupos con Previsualización y Advertencias**: Al crear un grupo, el usuario puede ver una vista previa antes de finalizar la creación. Si existen advertencias o posibles conflictos, estas se muestran claramente antes de proceder, permitiendo al usuario tomar decisiones informadas.

- **Mensajes con Formato Markdown**: Los usuarios pueden personalizar sus mensajes utilizando formato Markdown, lo que permite agregar estilos como **negrita**, _cursiva_, ~~tachado~~, listas y citas, entre otras opciones. Esta funcionalidad mejora la expresividad y personalización dentro de los chats, ofreciendo una experiencia de mensajería más rica y dinámica.

## Tecnologías Usadas

-   **React**: Construcción de la interfaz de usuario.
-   **React Router**: Navegación entre vistas.
-   **Lexical**: Mejora de la visualización de mensajes con formato.
-   **Socket.io Client**: Chats en tiempo real.
-   **i18next**: Gestión de idiomas y traducciones.
-   **Tailwind CSS**: Diseño de la interfaz.
-   **JS Cookie**: Manejo de tokens de sesión en cookies.

## Cómo iniciar el proyecto

1.  **Clona el repositorio :** `git clone https://github.com/Ulternae/KC_Chat_Front.git`
    
2.  **Instala las dependencias:** `npm i`

3.  **Ejecutar Database:**  Ejecuta la base de datos siguiendo las instrucciones proporcionadas en [KC Chat Backend](https://github.com/Ulternae/KC_Chat_Back?tab=readme-ov-file#c%C3%B3mo-iniciar-el-proyecto) para obtener la URL de la base de datos.
    
4.  **Crear cuenta en la consola de Cloud**  Crea una cuenta en Google Cloud y genera un  _ID de cliente para Aplicación web_  para habilitar el acceso a los servicios de Google OAuth y permitir la autenticación de usuarios mediante Google.

5. **Configurar las variables de entorno**

    VITE_API=https://kc-c...<br>
    VITE_GOOGLE_CLIENT_ID=447183748781-uoq...<br>
    VITE_GOOGLE_SECRET_CLIENT=OCSPX-rqX...<br>
    VITE_AVATAR_NOT_FOUND_IMAGE=https://generati...<br>

-   `VITE_API`: URL del backend de la aplicación.
-   `VITE_GOOGLE_CLIENT_ID`: ID del cliente de Google OAuth.
-   `VITE_GOOGLE_SECRET_CLIENT`: Clave secreta del cliente de Google.
-   `VITE_AVATAR_NOT_FOUND_IMAGE`: URL de la imagen predeterminada para avatares no encontrados.

6. **Ejecutar el proyecto** `npm run dev`
    
## Estructura del Proyecto

-   **/account**: Crear una nueva cuenta.
-   **/login**: Iniciar sesión en la aplicación.
-   **/**: Página de inicio, con navegación a las diferentes secciones.
	-   **/profile**: Visualizar y editar el perfil.
	    -   **/account**: Editar cuenta del usuario, nombre avatar entre otros
	    -   **/settings**: Modificar configuraciones como el thema o lenguaje
	-   **/friends**: Ver y gestionar la lista de amigos.
	-   **/groups**: Ver y unirse a grupos.
    -   **/groups/createGroup**: Crear un nuevo grupo.
    -   **/groups/:group_id**  : Ver los detalles de un grupo específico.
	-   **/messages/friends**: Ver los mensajes que posees con amigos
	-   **/messages/friends/:chat_id_user**   : Acceder a un chat específico con un amigo.
	-   **/messages/groups**: Ver los mensajes de los grupos.
	-   **/messages/groups/:group_id** : Acceder a un grupo específico.
	-   **/messages/groups/:group_id/:chat_id**  : Acceder a un chat específico dentro de un grupo.
	-   **/*/**: Página de error 404 para rutas no encontradas.




## Vista General de la Interfaz de Usuario

![image](https://github.com/user-attachments/assets/321206d0-e703-4cb9-a388-eee0beec4453)

![image](https://github.com/user-attachments/assets/b75c3659-30b8-4c44-b601-bf36a17b96d5)

![image](https://github.com/user-attachments/assets/1db43a1a-4915-4ef2-a33f-fb2363c8f0e4)

![image](https://github.com/user-attachments/assets/04ffd6b3-8e9e-46e3-a7e6-2e4144283f22)

![image](https://github.com/user-attachments/assets/2cba1f3c-321a-4a21-b933-279ffb9589b6)

![image](https://github.com/user-attachments/assets/8af8bed8-07c3-4df3-a55e-9107f041a0e6)


### y el EasterEgg, quien sera el primero en encontrarlo?

![image](https://github.com/user-attachments/assets/3096cc6d-c5a3-41a3-8df1-99110fc3ab71)


