import Link from 'next/link'

export default function CreditosPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-12">
      <div className="flex flex-col items-center gap-4 xl:w-1/2 2xl:w-2/5">
        <h1 className="text-4xl 2xl:text-5xl font-bold">Créditos</h1>
        <div className="flex justify-between text-center bg-card shadow-lg rounded-2xl p-8 2xl:p-10 w-full">
          <Link
            href="/"
            className="underline-offset-4 hover:underline text-2xl 2xl:text-3xl font-semibold"
          >
            Gustavo
            <br />
            Gelinski
          </Link>
          <Link
            href="/"
            className="underline-offset-4 hover:underline text-2xl 2xl:text-3xl font-semibold"
          >
            Marcus
            <br />
            Magalhães
          </Link>
          <Link
            href="/"
            className="underline-offset-4 hover:underline text-2xl 2xl:text-3xl font-semibold"
          >
            Renan
            <br />
            Lack
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 xl:w-1/2 2xl:w-2/5">
        <h2 className="text-4xl 2xl:text-5xl font-bold">Sobre o jogo</h2>
        <p className="bg-card shadow-lg rounded-2xl p-8 2xl:p-10 text-xl 2xl:text-2xl text-center">
          Este jogo foi desenvolvido para pessoas com deficiência intelectual. Foi desenvolvido como
          parte da disciplina de Engenharia de Software do curso de Ciência da Computação da UTFPR -
          Campus Ponta Grossa.
        </p>
      </div>
    </div>
  )
}
