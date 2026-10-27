"use client";

import { useEffect, useState } from "react";
import { confirmAction, notify, openForm, tellError } from "@/components/dialogs";
import { brand, onPrimary } from "@/lib/brand";
import { roleLabel, type Role, type SessionUser } from "@/lib/workspace/types";

export function UsersScreen({ session }: { session: SessionUser }) {
  const [users, setUsers] = useState<SessionUser[]>([]);
  const [loading, setLoading] = useState(true);

  async function reload() {
    const res = await fetch("/api/users", { credentials: "include" });
    const data = (await res.json().catch(() => [])) as SessionUser[];
    setUsers(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    void reload();
  }, []);

  async function addUser() {
    const values = await openForm({
      title: "Nuevo usuario",
      confirmText: "Crear",
      fields: [
        { name: "name", label: "Nombre", required: true },
        { name: "email", label: "Correo", type: "email", required: true },
        { name: "password", label: "Contraseña", type: "password", required: true },
        {
          name: "role",
          label: "Rol",
          type: "select",
          options: [
            { value: "operator", label: "Operador" },
            { value: "admin", label: "Administrador" },
          ],
        },
      ],
    });
    if (!values) return;
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role === "admin" ? "admin" : "operator",
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      await tellError("No se creó el usuario", data.error);
      return;
    }
    await reload();
    await notify("Usuario creado");
  }

  async function changePassword(user: SessionUser) {
    const values = await openForm({
      title: user.id === session.id ? "Tu contraseña" : `Contraseña de ${user.name}`,
      confirmText: "Guardar",
      fields: [{ name: "password", label: "Nueva contraseña", type: "password", required: true }],
    });
    if (!values) return;
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: values.password }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      await tellError("No se cambió la contraseña", data.error);
      return;
    }
    await notify("Contraseña actualizada");
  }

  async function changeRole(user: SessionUser, role: Role) {
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      await tellError("No se cambió el rol", data.error);
      await reload();
      return;
    }
    setUsers((current) => current.map((item) => (item.id === user.id ? { ...item, role } : item)));
  }

  async function removeUser(user: SessionUser) {
    const ok = await confirmAction("Quitar usuario", `${user.name} dejará de poder entrar.`, "Quitar");
    if (!ok) return;
    const res = await fetch(`/api/users/${user.id}`, { method: "DELETE" });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      await tellError("No se quitó", data.error);
      return;
    }
    await reload();
  }

  return (
    <div className="desk-stack">
      <div className="desk-row">
        <button
          type="button"
          className="desk-btn"
          style={{ background: brand.primary, color: onPrimary(brand.primary) }}
          onClick={() => void addUser()}
        >
          Añadir usuario
        </button>
        <button type="button" className="desk-btn quiet" onClick={() => void changePassword(session)}>
          Mi contraseña
        </button>
      </div>
      {loading ? <p className="desk-muted">Cargando…</p> : null}
      <ul className="desk-list">
        {users.map((user) => (
          <li key={user.id}>
            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
            <div className="desk-row">
              <select
                aria-label={`Rol de ${user.name}`}
                value={user.role}
                onChange={(event) => void changeRole(user, event.target.value as Role)}
              >
                <option value="admin">{roleLabel("admin")}</option>
                <option value="operator">{roleLabel("operator")}</option>
              </select>
              <button type="button" className="desk-btn quiet" onClick={() => void changePassword(user)}>
                Contraseña
              </button>
              {user.id !== session.id ? (
                <button type="button" className="desk-btn quiet" onClick={() => void removeUser(user)}>
                  Quitar
                </button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
