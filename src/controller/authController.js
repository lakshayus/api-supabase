import {hashPassword,comparePassword } from  "../config/security/passwordutil.js";
import  { generateToken, verifyToken } from "../config/security/jwtutil.js";
import authModel from "../models/authModel.js";


export async function login(req, res) {
  const { email, password } = req.body;

  try {
    // In a real application, you would fetch the user by email and then compare the hashed password.
    // For this example, we're directly using the model's login which assumes password comparison
    // is handled or is a direct match (less secure for production).
    // Assuming authModel.login now handles password hashing comparison internally or expects plain text for demo.
    const auth_user = await authModel.login(email);


    if (!auth_user.length>0 || !auth_user[0].password) { // Ensure data exists and has a password field
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const data=auth_user[0];
    console.log(data);

    const isPasswordValid = await comparePassword(password, data.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = generateToken({ id: data.id, email: data.email, tenantId: data.tenants.name, roleId: data.roles.name });

    res.json({ message: "Login successful", token, user: { id: data.id, email: data.email, name: data.name, tenantId: data.tenants.name, roleId: data.roles.name } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function register(req, res) {
  const { email, user_password, name, phone, membership, role_id, tenant_id } = req.body;
  try {
    const password = await hashPassword(user_password);
    

    const newUser = await authModel.register(email, password, name, phone, membership, role_id, tenant_id);
  
    console.log("New user registered:", newUser);
    res.status(201).json({ message: "Registration successful", user:{email,name,phone,membership,role_id,tenant_id}  });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
