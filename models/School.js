import db from "@/lib/db";

export const addSchool = async (school) => {
    const { slug, name, address, city, state, contact, image, email_id } = school;
    const query = `
    INSERT INTO schools (slug,name, address, city, state, contact, image, email_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;
    const [result] = await db.query(query, [slug, name, address, city, state, contact, image, email_id]);
    return result;
};

export const getSchools = async () => {
    const query = "SELECT id, slug,name, address, city, image FROM schools;";
    const [rows] = await db.query(query);
    return rows;
};

export const getSchoolsById = async (id) => {
    const query = "SELECT id, slug, name, address, city, image FROM schools WHERE slug = ?";
    const [rows] = await db.query(query, [id]); 
    return rows.length > 0 ? rows[0] : null;
};

export const deleteSchoolsById = async (id) => {
    const query = "DELETE FROM schools WHERE slug = ?";
    const [rows] = await db.query(query, [id]); 
    return rows.length > 0 ? rows[0] : null;
};

