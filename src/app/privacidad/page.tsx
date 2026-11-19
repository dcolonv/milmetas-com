import type { Metadata } from "next";
import Link from "next/link";
import { PaginaTexto } from "@/components/PaginaTexto";
import { pageMeta } from "@/lib/seo";
import { site } from "@/site.config";

const RUTA = "/privacidad";

export const metadata: Metadata = pageMeta({
  title: "Política de privacidad",
  description:
    "Qué datos trata Mil Metas y cuáles no: analítica sin cookies, metas guardadas solo en tu navegador, enlaces a tiendas y cómo ejercer tus derechos.",
  path: RUTA,
});

export default function Page() {
  const correo = site.contactEmail;
  const conAnuncios = Boolean(site.monetization.adsenseClient);
  return (
    <PaginaTexto
      titulo="Política de privacidad"
      entradilla="En corto: no hay cuentas, tus metas no salen de tu navegador y la analítica del sitio no usa cookies."
      ruta={RUTA}
      miga="Privacidad"
      actualizado="2026-11-19"
    >
      <h2>Quién es el responsable</h2>
      <p>
        El responsable de este sitio es el editor de {site.name}
        {site.publisherName ? `, ${site.publisherName}` : ""}. Para cualquier cuestión sobre privacidad puedes escribir
        a <a href={`mailto:${correo}`}>{correo}</a>.
      </p>

      <h2>Lo que no recogemos</h2>
      <ul>
        <li>No hay registro ni cuentas de usuario.</li>
        <li>No hay formularios que envíen datos personales a nuestros servidores.</li>
        <li>No vendemos ni cedemos datos de visitantes.</li>
      </ul>

      <h2>La calculadora y «Mis metas»</h2>
      <p>
        Los cálculos se hacen en tu navegador. Si pulsas «Guardar en este navegador», el plan se almacena en el
        almacenamiento local de tu dispositivo (<code>localStorage</code>) y no se envía a ningún servidor. Puedes
        borrarlo desde la propia lista de «Mis metas» o limpiando los datos del sitio en tu navegador.
      </p>
      <p>
        El enlace de un plan lleva sus datos (el nombre de la meta, las cifras y las fechas) en la propia dirección web.
        Quien reciba ese enlace verá esos datos, y como cualquier dirección que visitas, puede quedar en el historial de
        tu navegador y en los registros técnicos del servidor. No pongas en el nombre de una meta nada que no quieras
        compartir.
      </p>

      <h2>Analítica</h2>
      <p>
        Usamos Vercel Web Analytics para saber cuántas visitas recibe cada página, de qué sitios llegan y con qué tipo
        de dispositivo. Según la documentación del servicio, no utiliza cookies y no permite identificar ni seguir a
        visitantes concretos entre sitios; los datos se nos muestran agregados. Puedes consultar los detalles en la{" "}
        <a href="https://vercel.com/docs/analytics/privacy-policy" rel="noopener">
          política de privacidad de Vercel Web Analytics
        </a>
        .
      </p>

      <h2>Alojamiento</h2>
      <p>
        El sitio está alojado en Vercel. Como cualquier servidor web, el proveedor procesa datos técnicos de cada
        petición, como la dirección IP y el tipo de navegador, para servir las páginas y proteger el servicio.
      </p>

      <h2>Enlaces a tiendas y otros sitios</h2>
      <p>
        Algunas páginas enlazan a tiendas y sitios externos. Si haces clic, pasas a un sitio con su propia política de
        privacidad y sus propias cookies, sobre las que no tenemos control. Cuando el programa de afiliados
        correspondiente está activo, el enlace incluye un identificador que indica a la tienda que la visita llega
        desde {site.name}; no nos dice quién eres. Lo explicamos en{" "}
        <Link href="/afiliados">enlaces de afiliados</Link>.
      </p>

      <h2>Publicidad</h2>
      {conAnuncios ? (
        <p>
          Este sitio muestra anuncios de Google AdSense. Google y sus socios pueden usar cookies para mostrar anuncios
          basados en tus visitas a este y otros sitios. Puedes gestionar la personalización de anuncios en la{" "}
          <a href="https://adssettings.google.com" rel="noopener">
            configuración de anuncios de Google
          </a>
          .
        </p>
      ) : (
        <p>
          A día de hoy {site.name} no muestra anuncios ni carga código de redes publicitarias. Si en el futuro se
          activan, actualizaremos esta página antes de hacerlo y, donde la ley lo exija, pediremos tu consentimiento
          para las cookies publicitarias.
        </p>
      )}

      <h2>Si nos escribes</h2>
      <p>
        Si nos envías un correo, usaremos tu dirección y el contenido del mensaje únicamente para responderte. No te
        añadiremos a ninguna lista.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Según dónde vivas, puedes tener derecho a acceder a tus datos, rectificarlos, pedir que se borren u oponerte a
        su tratamiento, y a reclamar ante tu autoridad de protección de datos. Como no mantenemos perfiles de
        visitantes, lo habitual es que no tengamos datos tuyos más allá de los correos que nos hayas enviado. Para
        ejercer cualquier derecho, escribe a <a href={`mailto:${correo}`}>{correo}</a>.
      </p>

      <h2>Cambios</h2>
      <p>
        Si cambia la forma en que el sitio trata datos, por ejemplo al activar publicidad, actualizaremos esta página y
        su fecha.
      </p>
    </PaginaTexto>
  );
}
