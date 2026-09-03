package talentoactivo;
/**
 * Clase encargada de la conexión con la base de datos MySQL.
 * Proyecto: TalentoActivo
 * Autor: Fredy Alexander Cuastumal
 */

import dao.UsuarioDAO;

public class TalentoActivo {

    public static void main(String[] args) {

        UsuarioDAO dao = new UsuarioDAO();

        dao.eliminar(2);

    }

}