import Link from "next/link";
import categoryEssentials from "@/assets/category-essentials.jpg";
import categoryMen from "@/assets/category-men.jpg";
import { Button } from "@/components/ui/button";

const About = () => {
    return (
        <>
            <section className="container-page py-16 lg:py-24 max-w-3xl">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Our Story</p>
                <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl text-balance">
                    Modern essentials, rooted in Cambodian craft.
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                    Sahmlot — meaning "fabric" in Khmer — was born in Phnom Penh in 2021 with a single idea: that the everyday
                    shirt deserves more thought. We design with intention, source with care, and produce close to home.
                </p>
            </section>

            <section className="container-page grid gap-8 lg:grid-cols-2 pb-16">
                <div className="aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={categoryMen.src} alt="Sahmlot atelier" className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={categoryEssentials.src} alt="Folded essentials" className="h-full w-full object-cover" loading="lazy" />
                </div>
            </section>

            <section className="bg-secondary/50 py-16 lg:py-24">
                <div className="container-page grid gap-12 lg:grid-cols-3">
                    {[
                        { n: "01", t: "Considered design", d: "Tight, focused collections. No noise — just pieces you'll reach for again and again." },
                        { n: "02", t: "Natural materials", d: "Belgian linen, Cambodian-grown cotton and merino blends, dyed with low-impact processes." },
                        { n: "03", t: "Made nearby", d: "Cut and sewn by skilled artisans in our Phnom Penh atelier under fair-wage conditions." },
                    ].map((p) => (
                        <div key={p.n}>
                            <p className="font-serif text-3xl text-accent">{p.n}</p>
                            <h3 className="mt-3 font-serif text-2xl">{p.t}</h3>
                            <p className="mt-3 text-muted-foreground">{p.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container-page py-16 lg:py-24 text-center max-w-2xl">
                <h2 className="font-serif text-3xl sm:text-4xl">Built to be worn, not stored.</h2>
                <p className="mt-4 text-muted-foreground">Every Sahmlot piece is made for daily life — soft enough to live in, structured enough to last.</p>
                <Button asChild size="lg" className="mt-8 rounded-none">
                    <Link href="/shop">Shop the collection</Link>
                </Button>
            </section>
        </>
    );
};

export default About;
