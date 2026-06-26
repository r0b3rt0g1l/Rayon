"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TermsModal } from "@/components/layout/TermsModal";

const DECLINE_URL = "https://www.sonora.gob.mx";

export function TermsModalGate() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // En cada carga/refresh de la página: si no estamos en el inicio, mandar al
    // inicio; y mostrar siempre el aviso (no se recuerda la aceptación). El layout
    // raíz NO se re-monta en navegación interna, así que esto solo corre en cargas
    // completas (refresh o entrada directa por URL), no al navegar dentro del sitio.
    if (pathname !== "/") {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(true);
    // Solo al montar: se usa a propósito el pathname de la carga completa.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAccept = () => {
    // No se persiste la aceptación: el aviso vuelve a salir en el próximo refresh.
    setOpen(false);
  };

  const handleDecline = () => {
    window.location.href = DECLINE_URL;
  };

  return (
    <TermsModal
      open={open}
      onAccept={handleAccept}
      onDecline={handleDecline}
    />
  );
}

export default TermsModalGate;
