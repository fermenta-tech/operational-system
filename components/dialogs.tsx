"use client";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { brand } from "@/lib/brand";
import type { Role } from "@/lib/workspace/types";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "select";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
};

const popup = {
  heightAuto: false as const,
  scrollbarPadding: false as const,
  buttonsStyling: false as const,
  reverseButtons: true,
  focusConfirm: false,
  allowOutsideClick: false as const,
  confirmButtonColor: brand.primary,
  customClass: {
    popup: "os-swal",
    confirmButton: "os-swal-ok",
    cancelButton: "os-swal-cancel",
    validationMessage: "os-swal-error",
  },
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function openForm(options: {
  title: string;
  text?: string;
  confirmText: string;
  fields: Field[];
}): Promise<Record<string, string> | null> {
  const html = options.fields
    .map((field) => {
      const control =
        field.type === "select"
          ? `<select name="${esc(field.name)}">${(field.options ?? [])
              .map((option) => `<option value="${esc(option.value)}">${esc(option.label)}</option>`)
              .join("")}</select>`
          : `<input name="${esc(field.name)}" type="${field.type ?? "text"}" placeholder="${esc(field.placeholder ?? "")}" autocomplete="off" />`;
      return `<label class="os-field">${esc(field.label)}${control}</label>`;
    })
    .join("");

  const result = await Swal.fire({
    ...popup,
    title: options.title,
    text: options.text,
    html,
    showCancelButton: true,
    confirmButtonText: options.confirmText,
    cancelButtonText: "Cancelar",
    didOpen: () => {
      const first = Swal.getPopup()?.querySelector("input, select");
      if (first instanceof HTMLElement) first.focus();
    },
    preConfirm: () => {
      const root = Swal.getPopup();
      if (!root) return false;
      const values: Record<string, string> = {};
      for (const field of options.fields) {
        const input = root.querySelector(`[name="${field.name}"]`);
        const value = input instanceof HTMLInputElement || input instanceof HTMLSelectElement ? input.value.trim() : "";
        if (field.required !== false && !value) {
          Swal.showValidationMessage(`Completa ${field.label.toLowerCase()}.`);
          return false;
        }
        values[field.name] = value;
      }
      return values;
    },
  });

  if (!result.isConfirmed || !result.value || typeof result.value !== "object") return null;
  return result.value as Record<string, string>;
}

export async function openInvite(options: {
  title: string;
  users: { id: string; name: string; email: string; role: Role }[];
  selected: string[];
}): Promise<string[] | null> {
  const people = options.users
    .map((user) => {
      const checked = options.selected.includes(user.id) ? "checked" : "";
      const role = user.role === "admin" ? "Administrador" : "Operador";
      return `<label class="os-check"><input type="checkbox" name="invite" value="${esc(user.id)}" ${checked} /><span><strong>${esc(user.name)}</strong> ${esc(user.email)} · ${role}</span></label>`;
    })
    .join("");

  const result = await Swal.fire({
    ...popup,
    title: options.title,
    html: `<p class="os-swal-note">Los administradores ven todos los manuales. Marca quién más puede ver este cuando esté publicado.</p><div class="os-people">${people || "<p>Todavía no hay otros usuarios.</p>"}</div>`,
    showCancelButton: true,
    confirmButtonText: "Publicar",
    cancelButtonText: "Cancelar",
    didOpen: () => {
      const first = Swal.getPopup()?.querySelector("input");
      if (first instanceof HTMLElement) first.focus();
    },
    preConfirm: () => {
      const root = Swal.getPopup();
      if (!root) return [];
      return [...root.querySelectorAll<HTMLInputElement>('input[name="invite"]:checked')].map((input) => input.value);
    },
  });

  if (!result.isConfirmed || !Array.isArray(result.value)) return null;
  return result.value as string[];
}

export async function confirmAction(title: string, text: string, confirmText: string): Promise<boolean> {
  const result = await Swal.fire({
    ...popup,
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: "Cancelar",
  });
  return result.isConfirmed;
}

export function notify(title: string): Promise<unknown> {
  return Swal.fire({
    ...popup,
    icon: "success",
    title,
    timer: 1200,
    showConfirmButton: false,
    allowOutsideClick: true,
    allowEscapeKey: true,
    backdrop: false,
  });
}

export function tellError(title: string, text?: string): Promise<unknown> {
  return Swal.fire({
    ...popup,
    icon: "error",
    title,
    text,
    confirmButtonText: "Entendido",
  });
}
