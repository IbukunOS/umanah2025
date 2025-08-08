import Wishes from "../Wishes/Index";
import Gallery from "../Gallery/Index";

function Birthday() {
  return (
    <section
      data-color="salmon"
      className="section w-full bg-birthday-gradient py-20 sm:py-28 px-4 sm:px-8 animate-fade-in"
      aria-labelledby="birthday-heading"
    >
      <header className="max-w-5xl mx-auto text-center mb-10 sm:mb-14">
        <h2 id="birthday-heading" className="font-[SansitaBold] text-4xl sm:text-6xl tracking-tight">
          Happy Birthday! ✨🎉
        </h2>
        <p className="mt-3 sm:mt-4 font-[SansitaReg] text-base sm:text-lg opacity-90">
          Share your wishes and browse the celebration gallery below.
        </p>
      </header>

      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        {/* Wishes (Messages) */}
        <article className="card shadow-birthday p-6 sm:p-8 rounded-2xl animate-enter">
          <h3 className="sr-only">Birthday Wishes</h3>
          <Wishes />
        </article>

        {/* Gallery */}
        <article className="card shadow-birthday p-6 sm:p-8 rounded-2xl animate-enter">
          <h3 className="sr-only">Birthday Gallery</h3>
          <Gallery />
        </article>
      </div>
    </section>
  );
}

export default Birthday;
