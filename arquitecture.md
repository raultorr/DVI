# ARQUITECTURE 📃
### CARPETAS: 
* assets
  * audio
  * Menu
  * sprites
    * enemy: sprites de los enemigos.
    * goal: sprite del final del mapa.
    * hub: sprites de la interfaz.
    * laser: sprites de los lasers.
    * playerAnimations: sprites de las animaciones del personaje.
    * spikes: sprites de las spikes.
  * TileSets: Contiene las imagenes y los tsx de los mapas
* Maps: Contiene los tmx de tiled
* slides
* src: Codigo del juego
### ficheros:
* game.js: Clase principal que carga todos los assets necesarios, ademas de hacer de iniciador del juego comunica a las clases con las demas. Es llamado por los niveles para actualizar sus elementos y realizar comprobaciones como interacciones, finales de nivel, muerte, etc...
* Level 1/2/3: Carga los mapas, los sonidos y los elementos necesarios, ya sean trampas enemigos. Con cada update llama a game para que actualize cada elemento.
* menu.js: Menu de inicio del juego.
* player.js: Clase en la que se defiene los atributos del jugador asi de como realizar sus updates. Cada movimiento se realiza acorde a los inputs del jugador y a los objetos equipados.
* enemy.js: Clase del enemigo de patrulla. Detecta si el jugador se encuentra a una distancia y si lo esta mirando y dispara, matandolo. Si no realiza rondas hasta llegar a una pared o al fin de un terreno.
* enemyChaser.js: Realiza el mismo comprotamiento de movimiento que enemy pero solo reacciona al jugador si esta en rango y realiza la animacion de correr. Elimina al jugador corriendo a gran velocidad a por el.
* consolaPuente: clase a la que se le vincula dos puntos del mapa, uno para la consola y otro para el puente/puerta. Se les puede dar la opcion de temporizador haciendo que se activen o desactiven tras pasar el tiempo.
* lasers.js: Clase encargada de manejar los lasers, se crea especificando si se quiere iniciar con el laser encendido o apagado y el tiempo entre estados.
* projectile.js: Crea los projectiles disparados por enemy, matando al jugador.
* bullet.js: Crea los projectiles disparados por el jugador, distrallendo a los enemigos, pero no a los chasers.
* items.js: Clase encargada de manejar los "power ups" que el jugador recoge por cada mapa. 


