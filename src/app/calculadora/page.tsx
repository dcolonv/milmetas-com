import type { Metadata } from "next";
import Link from "next/link";
import { EjemploResuelto } from "@/components/calculadora/EjemploResuelto";
import { PaginaCalculadora } from "@/components/calculadora/PaginaCalculadora";
import type { Pregunta } from "@/components/Faq";
import { ejemplos } from "@/data/ejemplos";
import { predeterminados } from "@/data/presets";
import { pageMeta } from "@/lib/seo";

const RUTA = "/calculadora";
const TITULO = "Calculadora de metas: cuánto avanzar y si vas a tiempo";
const DESCRIPCION =
  "Escribe tu meta, la cifra y la fecha: te decimos cuánto avanzar por día, semana y mes, cuánto deberías llevar hoy y si vas adelantado o atrasado.";

export const metadata: Metadata = pageMeta({
  title: "Calculadora de metas: ritmo y si vas a tiempo",
  description: DESCRIPCION,
  path: RUTA,
});

const preguntas: Pregunta[] = [
  {
    pregunta: "¿Cómo sé si voy a tiempo con mi meta?",
    respuesta:
      "Compara lo que llevas con lo que tocaba para hoy. Lo previsto para hoy es el total de la meta multiplicado por los días transcurridos y dividido entre los días del plan. Si llevas más, vas adelantado; si llevas menos, vas atrasado. La calculadora hace la cuenta y te da además el ritmo que necesitas desde mañana.",
  },
  {
    pregunta: "¿Qué margen usa para decir que voy a tiempo?",
    respuesta:
      "El mayor entre un día de ritmo y el 5 % del total de la meta. Si la diferencia con lo previsto está dentro de ese margen, el veredicto es «vas a tiempo». Así un libro a medias o una semana floja no cambian el veredicto, pero un retraso real sí.",
  },
  {
    pregunta: "¿Sirve para metas que bajan, como una deuda?",
    respuesta:
      "Sí. Escribe el valor del que partes en «Empiezo en» y un número menor en «Quiero llegar a», por ejemplo de 2.400 a 0. El ritmo que sale es lo que tienes que bajar cada día, semana y mes.",
  },
  {
    pregunta: "¿Dónde se guardan mis metas?",
    respuesta:
      "En tu navegador, y solo si pulsas «Guardar en este navegador». No hay cuentas ni se envía nada a un servidor. El enlace que copias lleva los datos del plan en la propia dirección, así que quien lo reciba verá las mismas cifras.",
  },
  {
    pregunta: "¿Cuenta el día de inicio y el de la fecha límite?",
    respuesta:
      "Sí, los dos. Un plan del 1 de enero al 31 de diciembre de 2027 tiene 365 días. Lo previsto para hoy se calcula al terminar el día: el último día del plan, lo previsto es el total.",
  },
  {
    pregunta: "¿Por qué un mes son 30,4375 días?",
    respuesta:
      "Porque es la duración media de un mes: 365,25 días entre 12. El ritmo mensual es el ritmo diario multiplicado por esa cifra. Sirve como referencia; los meses reales tienen entre 28 y 31 días.",
  },
];

export default function Page() {
  return (
    <PaginaCalculadora
      ruta={RUTA}
      migas={[{ nombre: "Calculadora de metas", ruta: RUTA }]}
      titulo={TITULO}
      entradilla="Una meta con número y fecha se puede repartir. Escribe la tuya y verás cuánto toca por día, por semana y por mes, y si con lo que llevas hoy vas adelantado o atrasado."
      descripcion={DESCRIPCION}
      pre={predeterminados}
      preguntas={preguntas}
    >
      <section aria-labelledby="como-usarla" className="prosa">
        <h2 id="como-usarla">Cómo usarla</h2>
        <ol>
          <li>
            <strong>Escribe de dónde sales y adónde quieres llegar.</strong> Casi siempre se empieza en 0, pero puedes
            partir de cualquier número: los kilómetros que ya llevas, lo que tienes ahorrado o lo que debes.
          </li>
          <li>
            <strong>Pon las fechas.</strong> La de inicio y la límite, o pulsa una duración rápida. Si solo trabajas en
            la meta algunos días, indícalo en «Días por semana» para ver cuánto toca en cada sesión.
          </li>
          <li>
            <strong>Lee el ritmo.</strong> Por día, por semana y por mes, con las fechas en las que deberías pasar por
            el 25, el 50 y el 75 %.
          </li>
          <li>
            <strong>Vuelve cada semana.</strong> Escribe en «Hoy llevo» el valor en el que estás y la calculadora te
            dirá si vas a tiempo, cuánto te separa de lo previsto y qué ritmo necesitas desde mañana.
          </li>
        </ol>
        <p>
          ¿No sabes qué meta ponerte? En el <Link href="/metas">banco de metas</Link> hay ejemplos medibles por área, y
          cada uno se abre aquí con sus números.
        </p>
      </section>

      <section aria-labelledby="como-funciona" className="prosa">
        <h2 id="como-funciona">Cómo funciona</h2>
        <p>
          La calculadora reparte la meta en partes iguales entre todos los días del plan y compara ese reparto con lo que
          llevas. No hay nada oculto: estas son todas las fórmulas.
        </p>
        <div className="tabla">
          <table>
            <thead>
              <tr>
                <th scope="col">Dato</th>
                <th scope="col">Cómo se calcula</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Días del plan</td>
                <td>Días entre la fecha de inicio y la fecha límite, contando ambas</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>Diferencia entre el valor al que quieres llegar y el valor inicial</td>
              </tr>
              <tr>
                <td>Ritmo por día</td>
                <td>Total ÷ días del plan</td>
              </tr>
              <tr>
                <td>Ritmo por semana y por mes</td>
                <td>Ritmo por día × 7, y ritmo por día × 30,4375 (la duración media de un mes)</td>
              </tr>
              <tr>
                <td>Ritmo por sesión</td>
                <td>Ritmo por semana ÷ días por semana que le dedicas</td>
              </tr>
              <tr>
                <td>Previsto para hoy</td>
                <td>Valor inicial más (o menos, si la meta baja) total × días transcurridos ÷ días del plan</td>
              </tr>
              <tr>
                <td>Margen</td>
                <td>El mayor entre un día de ritmo y el 5 % del total</td>
              </tr>
              <tr>
                <td>Veredicto</td>
                <td>
                  A tiempo si la diferencia con lo previsto está dentro del margen; adelantado si lo supera; atrasado si
                  queda por debajo
                </td>
              </tr>
              <tr>
                <td>Ritmo desde mañana</td>
                <td>Lo que falta ÷ días que quedan después de hoy</td>
              </tr>
              <tr>
                <td>Proyección</td>
                <td>Fecha en la que alcanzarías el total si mantienes tu ritmo medio hasta hoy (lo hecho ÷ días transcurridos)</td>
              </tr>
              <tr>
                <td>Hitos</td>
                <td>El día en que el reparto uniforme alcanza el 25, el 50, el 75 y el 100 %</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          El reparto uniforme es una referencia, no una obligación. Muchas metas avanzan a saltos (un libro se termina
          de golpe, un ahorro llega con la nómina), y para eso está el margen. Si quieres entender mejor la lógica y qué
          hacer cuando el ritmo que falta ya no es realista, lee{" "}
          <Link href="/guias/como-saber-si-vas-a-tiempo">cómo saber si vas a tiempo con una meta</Link>.
        </p>
      </section>

      <section aria-labelledby="ejemplos">
        <h2 id="ejemplos" className="text-2xl font-bold">
          Ejemplos resueltos
        </h2>
        <p className="mt-2 max-w-2xl text-muted">
          Cuatro planes calculados paso a paso. Las cifras salen de las mismas fórmulas que usa la calculadora, y puedes
          abrir cada uno para cambiar los números.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {ejemplos.map((ej) => (
            <EjemploResuelto key={ej.titulo} ejemplo={ej} ruta={RUTA} />
          ))}
        </div>
      </section>

      <section aria-labelledby="mas" className="prosa">
        <h2 id="mas">Para sacarle más partido</h2>
        <ul>
          <li>
            <Link href="/guias/como-escribir-una-meta-smart">Cómo escribir una meta SMART</Link>: si tu meta aún no
            tiene número ni fecha, empieza por aquí.
          </li>
          <li>
            <Link href="/guias/metas-y-habitos">Metas y hábitos</Link>: cómo convertir el ritmo semanal en una rutina
            que no dependa de la fuerza de voluntad.
          </li>
          <li>
            <Link href="/guias/metodo-woop-y-planes-si-entonces">Método WOOP y planes «si-entonces»</Link>: qué hacer el
            día que no apetece.
          </li>
        </ul>
      </section>
    </PaginaCalculadora>
  );
}
