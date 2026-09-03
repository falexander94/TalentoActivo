
package dao;

import conexion.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import modelo.Usuario;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
/**
 * Clase encargada de realizar las operaciones CRUD.
 */
public class UsuarioDAO {

    public void insertar(Usuario usuario) {

        String sql = "INSERT INTO usuario(nombre, correo, telefono, contrasena) VALUES (?, ?, ?, ?)";

        try {
            Connection con = Conexion.conectar();
            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, usuario.getNombre());
            ps.setString(2, usuario.getCorreo());
            ps.setString(3, usuario.getTelefono());
            ps.setString(4, usuario.getContrasena());

            ps.executeUpdate();

            System.out.println("Usuario registrado correctamente.");

            ps.close();
            con.close();

        } catch (SQLException e) {
            System.out.println("Error al insertar: " + e.getMessage());
        }
    }
    public List<Usuario> listar() {

    List<Usuario> lista = new ArrayList<>();

    String sql = "SELECT * FROM usuario";

    try {
        Connection con = Conexion.conectar();
        PreparedStatement ps = con.prepareStatement(sql);
        ResultSet rs = ps.executeQuery();

        while (rs.next()) {

            Usuario usuario = new Usuario();

            usuario.setId(rs.getInt("id"));
            usuario.setNombre(rs.getString("nombre"));
            usuario.setCorreo(rs.getString("correo"));
            usuario.setTelefono(rs.getString("telefono"));
            usuario.setContrasena(rs.getString("contrasena"));

            lista.add(usuario);
        }

        rs.close();
        ps.close();
        con.close();

    } catch (SQLException e) {
        System.out.println("Error al consultar: " + e.getMessage());
    }

    return lista;
}
    public void actualizar(Usuario usuario) {

    String sql = "UPDATE usuario SET nombre=?, correo=?, telefono=?, contrasena=? WHERE id=?";

    try {

        Connection con = Conexion.conectar();
        PreparedStatement ps = con.prepareStatement(sql);

        ps.setString(1, usuario.getNombre());
        ps.setString(2, usuario.getCorreo());
        ps.setString(3, usuario.getTelefono());
        ps.setString(4, usuario.getContrasena());
        ps.setInt(5, usuario.getId());

        ps.executeUpdate();

        System.out.println("Usuario actualizado correctamente.");

        ps.close();
        con.close();

    } catch (SQLException e) {

        System.out.println("Error al actualizar: " + e.getMessage());

    }

}
 public void eliminar(int id) {

    String sql = "DELETE FROM usuario WHERE id=?";

    try {

        Connection con = Conexion.conectar();
        PreparedStatement ps = con.prepareStatement(sql);

        ps.setInt(1, id);

        ps.executeUpdate();

        System.out.println("Usuario eliminado correctamente.");

        ps.close();
        con.close();

    } catch (SQLException e) {

        System.out.println("Error al eliminar: " + e.getMessage());

    }

}   
}