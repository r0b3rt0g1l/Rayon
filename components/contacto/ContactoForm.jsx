"use client";

import { useState } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
} from "react-aria-components";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { municipalConfig } from "@/lib/municipalConfig";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export function ContactoForm({ accessKey }) {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", accessKey);
    formData.append(
      "subject",
      `Nuevo mensaje de contacto — Portal ${municipalConfig.identidad.nombreCorto}`,
    );
    formData.append(
      "from_name",
      `Portal ${municipalConfig.identidad.nombreCorto} · Contacto`,
    );

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        throw new Error(json.message || "No se pudo enviar el mensaje.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Ocurrió un error inesperado.");
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-guinda)] focus:ring-2 focus:ring-[var(--color-guinda)] data-[invalid]:border-red-500";

  // Sin access key configurada (NEXT_PUBLIC_WEB3FORMS_KEY) el formulario no puede
  // enviar: mostramos un estado claro en lugar de dejar fallar el envío.
  if (!accessKey) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-white p-6 text-center shadow-[var(--shadow-card)] md:p-8">
        <p className="text-sm text-[var(--color-text-secondary)]">
          El formulario de contacto estará disponible en breve. Gracias por tu
          comprensión.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] md:p-6">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-12 text-center text-emerald-800"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle className="h-8 w-8" aria-hidden="true" />
            </span>
            <h3 className="font-display text-2xl font-bold text-emerald-900">
              Tu mensaje fue enviado exitosamente
            </h3>
            <p className="max-w-md text-sm text-emerald-800/85">
              Gracias por escribirnos. Recibimos tu mensaje y te
              responderemos a la brevedad posible.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 rounded-full border border-emerald-300 bg-white px-5 py-2 text-sm font-semibold text-emerald-800 hover:border-emerald-500"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <Form
            key="form"
            onSubmit={onSubmit}
            validationBehavior="native"
            className="flex flex-col gap-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TextField name="nombre" isRequired>
                <Label className="text-sm font-semibold text-[var(--color-text)]">
                  Nombre completo *
                </Label>
                <Input className={cn("mt-2", inputClasses)} placeholder="Tu nombre" />
                <FieldError className="mt-1 text-xs text-red-600" />
              </TextField>

              <TextField name="email" type="email" isRequired>
                <Label className="text-sm font-semibold text-[var(--color-text)]">
                  Correo electrónico *
                </Label>
                <Input
                  className={cn("mt-2", inputClasses)}
                  placeholder="tu@correo.com"
                />
                <FieldError className="mt-1 text-xs text-red-600" />
              </TextField>
            </div>

            <TextField name="asunto" isRequired>
              <Label className="text-sm font-semibold text-[var(--color-text)]">
                Asunto *
              </Label>
              <Input
                className={cn("mt-2", inputClasses)}
                placeholder="¿Sobre qué quieres escribirnos?"
              />
              <FieldError className="mt-1 text-xs text-red-600" />
            </TextField>

            <TextField name="mensaje" isRequired>
              <Label className="text-sm font-semibold text-[var(--color-text)]">
                Mensaje *
              </Label>
              <TextArea
                rows={4}
                className={cn("mt-2 resize-y", inputClasses)}
                placeholder="Escribe aquí tu mensaje..."
              />
              <FieldError className="mt-1 text-xs text-red-600" />
            </TextField>

            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  key="error"
                  role="alert"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Hubo un problema. Intenta de nuevo más tarde.
                    {errorMsg ? (
                      <span className="mt-1 block text-xs text-red-600/80">
                        Detalle técnico: {errorMsg}
                      </span>
                    ) : null}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[var(--color-text-muted)]">
                Al enviar tu mensaje aceptas el aviso de privacidad del portal.
              </p>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-guinda)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-guinda-deep)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Enviar mensaje
                  </>
                )}
              </button>
            </div>
          </Form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ContactoForm;
