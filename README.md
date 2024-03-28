#Autor: Pablo Villanueva

#Couro Azul - Proyecto de React Coder

#TECONOLOGIAS UTILIZADAS:
VITE
REACT
REACT ROUTER DOM PARA RUTAS
FIRESTORE DATABASE PARA PERSISTENCIA DE DATOS

#OBSERVACIONES DEL PROYECTO

Este proyecto utiliza variables de entorno para las credenciales de Firestore. Se requiere crear un archivo .env y pegar alli las credenciales aportadas
por el administrador del proyecto.

La activacion del proyecto debe ser dentro de la carpeta src con la activacion del comando npm run dev.

Se utilizaron tres Hooks de Contexto para compartir informacion entre componentes del proyecto: Mi Contexto, TotalQuantitiyContext y resumeCheckoutContext.
Con mas tiempo se podran modificar los nombres de estos objetos para que sean mas explicitos. Comparten la info de los producots seleccionados, asi como
tambien informacion de totales y del carrito.

Componentes Principales:
App: Tiene logica robusta ya que alli se renderiza el componente chekout.
ItemListContainer: Trae lista completa de los productos cargados.
DetailProductContainer: Captura mediante Hooj useParams() el Id de la ruta y lo toma para renderizar el producto elegido.
CartContainer: Muestra el listado de productos cargados en el carrito y la opcion de activar el chekout para confirmar compra.

PRUEBAS PRINCIPALES:
Elementos principales activos del menu de navegacion: SHOW LIST PRODUCTS, SHOW-CART, ORDER QUERY (para consulta de ordenes generadas)
Recorrer categorias FORD, FIAT, PEUGEOT para ver distribucion por marcas.
Seleccionar productos con el boton ADD dentro de DetailProductsContainer.
Agregar mas cantidades desde el carrito
Activar el chekout, ingresar datos y confirmar la operacion. Copiar Order Id recibido.
Ir a la seccion ORDER QUERY y pegar el id para obtener datos de la orden generada.




