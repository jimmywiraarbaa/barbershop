import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const navLinks = [
    { label: 'Home', href: '#top' },
    { label: 'Services', href: '#services' },
    { label: 'Find Us', href: '#map' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
];

const stats = [
    { label: 'Clients per week', value: '420+' },
    { label: 'Average session', value: '35 min' },
    { label: 'Premium rating', value: '4.9/5' },
];

const services = [
    {
        title: 'Signature Fade',
        detail: 'Precision fade with clean, sharp lines.',
        price: 'Rp 85k',
    },
    {
        title: 'Beard Architecture',
        detail: 'Shape, define, and smooth the beard line.',
        price: 'Rp 55k',
    },
    {
        title: 'Scalp Refresh',
        detail: 'Wash, massage, and styling finish.',
        price: 'Rp 45k',
    },
];

const testimonials = [
    {
        name: 'Raka W',
        role: 'Regular Client',
        quote:
            'Every detail is on point. I can book, arrive, and walk out confident.',
    },
    {
        name: 'Alvin S',
        role: 'Entrepreneur',
        quote:
            'Clean space, sharp barbers, and the schedule is always accurate.',
    },
    {
        name: 'Dimas H',
        role: 'Athlete',
        quote:
            'Fast service without cutting corners. Exactly what I need.',
    },
];

const teamMembers = [
    {
        name: 'Ronaldo F',
        role: 'Master Barber',
        image:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    },
    {
        name: 'Jenna S',
        role: 'Style Curator',
        image:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    },
    {
        name: 'Irfan K',
        role: 'Senior Barber',
        image:
            'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80',
    },
    {
        name: 'Ayu M',
        role: 'Grooming Artist',
        image:
            'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    },
];

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Barbershop">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=cormorant-garamond:400,500,600,700|manrope:300,400,500,600,700"
                    rel="stylesheet"
                />
                <style>{`
                    :root {
                        --landing-bg: #ffffff;
                        --landing-ink: #111111;
                        --landing-muted: #5b5b5b;
                        --landing-card: #ffffff;
                        --landing-red: #d7263d;
                        --landing-blue: #1d4ed8;
                        --landing-soft-red: #fde4e7;
                        --landing-soft-blue: #e3edff;
                        --landing-dark: #0b0d11;
                    }

                    .landing-hero {
                        background-image:
                            linear-gradient(90deg, rgba(5, 7, 12, 0.92) 0%, rgba(5, 7, 12, 0.75) 45%, rgba(5, 7, 12, 0.2) 100%),
                            url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80');
                        background-size: cover;
                        background-position: center;
                    }

                    .ribbon-text {
                        font-family: 'Cormorant Garamond', serif;
                        font-size: clamp(1.3rem, 3vw, 2.6rem);
                        letter-spacing: 0.45em;
                        text-transform: uppercase;
                        color: rgba(255, 255, 255, 0.9);
                    }

                    .section-title {
                        font-family: 'Cormorant Garamond', serif;
                    }

                    @keyframes fadeUp {
                        from {
                            opacity: 0;
                            transform: translateY(18px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes floatSlow {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-10px);
                        }
                    }

                    .fade-up {
                        animation: fadeUp 800ms ease both;
                    }

                    .float-slow {
                        animation: floatSlow 6s ease-in-out infinite;
                    }
                `}</style>
            </Head>
            <div
                id="top"
                className="min-h-screen bg-[var(--landing-bg)] text-[var(--landing-ink)]"
                style={{ fontFamily: 'Manrope, sans-serif' }}
            >
                <div className="landing-hero relative">
                    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-white">
                        <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 place-items-center rounded-full border border-white/40 text-sm font-semibold">
                                CH
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                                    Coolhead
                                </p>
                                <p className="text-sm font-medium">Barbershop</p>
                            </div>
                        </div>
                        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.3em] text-white/70 lg:flex">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="transition hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <div className="flex items-center gap-2">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
                                    >
                                        Masuk
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="rounded-full bg-[var(--landing-red)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_40px_-20px_rgba(215,38,61,0.8)] transition hover:-translate-y-0.5"
                                        >
                                            Daftar
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </header>

                    <main className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-10 text-white lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="fade-up" style={{ animationDelay: '120ms' }}>
                            <p className="text-xs uppercase tracking-[0.5em] text-white/70">
                                Premium Grooming House
                            </p>
                            <h1 className="section-title mt-4 text-4xl font-semibold leading-tight md:text-6xl">
                                Experience the Luxury
                                <span className="block text-white/70">
                                    of Modern Barbering
                                </span>
                            </h1>
                            <p className="mt-5 max-w-xl text-sm text-white/75 md:text-base">
                                A clean cut, calm atmosphere, and a schedule that
                                never wastes your time. Pick your capster, lock
                                the slot, and walk out sharp.
                            </p>
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <Link
                                    href={auth.user ? dashboard() : login()}
                                    className="rounded-full bg-[var(--landing-red)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-[0_18px_40px_-20px_rgba(215,38,61,0.8)] transition hover:-translate-y-0.5"
                                >
                                    Book Now
                                </Link>
                                <a
                                    href="#services"
                                    className="rounded-full border border-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-black"
                                >
                                    View Services
                                </a>
                            </div>
                            <div className="mt-10 grid gap-4 md:grid-cols-3">
                                {stats.map((stat, index) => (
                                    <div
                                        key={stat.label}
                                        className="rounded-2xl border border-white/15 bg-white/10 p-4 text-xs backdrop-blur"
                                        style={{
                                            animationDelay: `${220 + index * 120}ms`,
                                        }}
                                    >
                                        <p className="text-lg font-semibold">
                                            {stat.value}
                                        </p>
                                        <p className="text-white/70">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative flex items-center justify-center">
                            <div className="float-slow w-full max-w-sm rounded-[34px] border border-white/10 bg-white/10 p-6 backdrop-blur">
                                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
                                    <span>Today</span>
                                    <span>Slots</span>
                                </div>
                                <div className="mt-6 space-y-4">
                                    <div className="rounded-2xl border border-white/10 bg-white/90 p-4 text-black">
                                        <p className="text-sm font-semibold">
                                            Executive Fade
                                        </p>
                                        <p className="mt-1 text-xs text-black/60">
                                            Sharp temple line, classic top.
                                        </p>
                                        <div className="mt-3 flex items-center justify-between text-xs text-black/60">
                                            <span>45 min</span>
                                            <span>Rp 90k</span>
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-white/10 bg-white/80 p-4 text-black">
                                        <p className="text-sm font-semibold">
                                            Beard Ritual
                                        </p>
                                        <p className="mt-1 text-xs text-black/60">
                                            Line-up, trim, and smooth finish.
                                        </p>
                                        <div className="mt-3 flex items-center justify-between text-xs text-black/60">
                                            <span>30 min</span>
                                            <span>Rp 55k</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 rounded-2xl border border-white/10 bg-white/95 px-4 py-3 text-xs text-black/60">
                                    Every capster has a scheduled shift for
                                    reliable booking.
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                <section className="relative">
                    <div className="bg-[var(--landing-red)]">
                        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-6 text-center">
                            <p className="ribbon-text">COOLHEAD SALOON FOR MEN</p>
                        </div>
                    </div>
                    <svg
                        className="block w-full"
                        viewBox="0 0 1440 120"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#ffffff"
                            d="M0,32L80,53.3C160,75,320,117,480,106.7C640,96,800,32,960,10.7C1120,-11,1280,11,1360,21.3L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
                        />
                    </svg>
                </section>

                <section
                    id="map"
                    className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr]"
                >
                    <div className="fade-up" style={{ animationDelay: '140ms' }}>
                        <p className="text-xs uppercase tracking-[0.4em] text-[var(--landing-muted)]">
                            Find us on map
                        </p>
                        <h2 className="section-title mt-4 text-3xl font-semibold md:text-4xl">
                            Your new grooming sanctuary
                            <span className="block text-[var(--landing-blue)]">
                                right in the city center.
                            </span>
                        </h2>
                        <p className="mt-4 text-sm text-[var(--landing-muted)] md:text-base">
                            Walk in for a quick touch-up or lock in an
                            appointment. Our lounge is designed for focus and
                            comfort, with a detail-first service flow.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href="#contact"
                                className="rounded-full bg-[var(--landing-blue)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:-translate-y-0.5"
                            >
                                Get Directions
                            </a>
                            <a
                                href="#services"
                                className="rounded-full border border-black/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--landing-ink)] transition hover:-translate-y-0.5"
                            >
                                Browse Services
                            </a>
                        </div>
                    </div>
                    <div className="relative">
                        <div
                            className="relative h-[340px] rounded-[32px] border border-black/10 bg-[#0d0f14]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), radial-gradient(circle at 30% 20%, rgba(29,78,216,0.3), transparent 40%), radial-gradient(circle at 70% 60%, rgba(215,38,61,0.35), transparent 45%)',
                                backgroundSize: '28px 28px, 28px 28px, cover, cover',
                            }}
                        >
                            {[
                                { left: '18%', top: '25%', color: 'red' },
                                { left: '38%', top: '48%', color: 'blue' },
                                { left: '55%', top: '30%', color: 'red' },
                                { left: '68%', top: '55%', color: 'blue' },
                                { left: '28%', top: '70%', color: 'red' },
                            ].map((pin, index) => (
                                <span
                                    key={`${pin.left}-${pin.top}`}
                                    className="absolute flex h-4 w-4 items-center justify-center"
                                    style={{
                                        left: pin.left,
                                        top: pin.top,
                                    }}
                                >
                                    <span
                                        className="block h-2.5 w-2.5 rounded-full"
                                        style={{
                                            backgroundColor:
                                                pin.color === 'red'
                                                    ? 'var(--landing-red)'
                                                    : 'var(--landing-blue)',
                                        }}
                                    />
                                    <span
                                        className="absolute h-6 w-6 rounded-full opacity-30"
                                        style={{
                                            backgroundColor:
                                                pin.color === 'red'
                                                    ? 'var(--landing-red)'
                                                    : 'var(--landing-blue)',
                                        }}
                                    />
                                </span>
                            ))}
                            <div className="absolute bottom-5 left-6 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black">
                                Coolhead Main Studio
                            </div>
                        </div>
                        <div className="absolute -bottom-8 right-6 hidden rounded-3xl border border-black/10 bg-white px-4 py-3 text-xs text-[var(--landing-muted)] shadow-lg md:block">
                            Open daily, walk-ins welcome.
                        </div>
                    </div>
                </section>

                <section
                    id="difference"
                    className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 md:grid-cols-[0.9fr_1.1fr]"
                >
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80"
                            alt="Luxury barbershop interior"
                            className="h-[360px] w-full rounded-[30px] object-cover grayscale"
                            loading="lazy"
                        />
                        <div className="absolute -bottom-6 left-6 rounded-2xl bg-[var(--landing-blue)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white">
                            Luxurious
                        </div>
                    </div>
                    <div className="fade-up" style={{ animationDelay: '160ms' }}>
                        <p className="text-xs uppercase tracking-[0.4em] text-[var(--landing-muted)]">
                            What makes us different
                        </p>
                        <h2 className="section-title mt-4 text-3xl font-semibold md:text-4xl">
                            Precision, hospitality, and
                            <span className="text-[var(--landing-red)]">
                                a calendar that respects you.
                            </span>
                        </h2>
                        <p className="mt-4 text-sm text-[var(--landing-muted)] md:text-base">
                            We schedule each capster to avoid crowding. Every
                            chair has a timeline, and every service has a
                            checklist. You get consistent results without the
                            wait.
                        </p>
                        <div className="mt-6 grid gap-3 text-sm text-[var(--landing-muted)] md:grid-cols-2">
                            <div className="rounded-2xl border border-black/10 bg-[var(--landing-soft-blue)]/60 p-4">
                                Clean workstations every session.
                            </div>
                            <div className="rounded-2xl border border-black/10 bg-[var(--landing-soft-red)]/70 p-4">
                                Verified booking slots for every capster.
                            </div>
                            <div className="rounded-2xl border border-black/10 bg-white p-4">
                                Premium grooming products only.
                            </div>
                            <div className="rounded-2xl border border-black/10 bg-white p-4">
                                Lounge designed for calm focus.
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="services"
                    className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 md:grid-cols-[1.05fr_0.95fr]"
                >
                    <div className="fade-up" style={{ animationDelay: '180ms' }}>
                        <p className="text-xs uppercase tracking-[0.4em] text-[var(--landing-muted)]">
                            Our Services
                        </p>
                        <h2 className="section-title mt-4 text-3xl font-semibold md:text-4xl">
                            Premium and elegant
                            <span className="text-[var(--landing-blue)]">
                                grooming menus.
                            </span>
                        </h2>
                        <p className="mt-4 text-sm text-[var(--landing-muted)] md:text-base">
                            Choose the service level that suits your style. From
                            signature fades to daily refresh, our barbers
                            deliver the same standard every time.
                        </p>
                        <div className="mt-6 space-y-4">
                            {services.map((service) => (
                                <div
                                    key={service.title}
                                    className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-4"
                                >
                                    <div>
                                        <p className="text-sm font-semibold">
                                            {service.title}
                                        </p>
                                        <p className="text-xs text-[var(--landing-muted)]">
                                            {service.detail}
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-[var(--landing-soft-red)] px-3 py-1 text-xs font-semibold text-[var(--landing-red)]">
                                        {service.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80"
                            alt="Barber service"
                            className="h-[360px] w-full rounded-[30px] object-cover grayscale"
                            loading="lazy"
                        />
                        <div className="absolute -bottom-6 right-6 rounded-2xl bg-[var(--landing-red)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-white">
                            Premium & Elegant
                        </div>
                    </div>
                </section>

                <section
                    id="testimonials"
                    className="bg-[var(--landing-soft-blue)]/40"
                >
                    <div className="mx-auto max-w-6xl px-6 py-16">
                        <div className="text-center">
                            <p className="text-xs uppercase tracking-[0.4em] text-[var(--landing-muted)]">
                                Voices of satisfaction
                            </p>
                            <h2 className="section-title mt-4 text-3xl font-semibold md:text-4xl">
                                Trusted by the city
                                <span className="text-[var(--landing-red)]">
                                    every day.
                                </span>
                            </h2>
                        </div>
                        <div className="mt-10 grid gap-4 md:grid-cols-3">
                            {testimonials.map((item) => (
                                <div
                                    key={item.name}
                                    className="rounded-3xl border border-black/10 bg-white p-6"
                                >
                                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--landing-muted)]">
                                        5/5 rating
                                    </p>
                                    <p className="mt-4 text-sm text-[var(--landing-muted)]">
                                        "{item.quote}"
                                    </p>
                                    <div className="mt-6">
                                        <p className="text-sm font-semibold">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-[var(--landing-muted)]">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="team" className="mx-auto max-w-6xl px-6 py-16">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <p className="text-xs uppercase tracking-[0.4em] text-[var(--landing-muted)]">
                            Meet the team
                        </p>
                        <h2 className="section-title text-3xl font-semibold md:text-4xl">
                            Crafted by barbers who care
                            <span className="text-[var(--landing-blue)]">
                                about the details.
                            </span>
                        </h2>
                        <p className="max-w-2xl text-sm text-[var(--landing-muted)]">
                            Each capster is trained for consistency. You can
                            expect clean delivery, friendly guidance, and a
                            unified service flow.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member) => (
                            <div
                                key={member.name}
                                className="group overflow-hidden rounded-3xl border border-black/10 bg-white"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="h-64 w-full object-cover grayscale transition duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="p-4">
                                    <p className="text-sm font-semibold">
                                        {member.name}
                                    </p>
                                    <p className="text-xs text-[var(--landing-muted)]">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="contact" className="bg-white">
                    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.95fr_1.05fr]">
                        <img
                            src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80"
                            alt="Barbershop chair"
                            className="h-[320px] w-full rounded-[30px] object-cover grayscale"
                            loading="lazy"
                        />
                        <div className="rounded-[30px] border border-black/10 bg-[var(--landing-dark)] p-8 text-white">
                            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                                Contact us
                            </p>
                            <h2 className="section-title mt-4 text-3xl font-semibold">
                                Ready for your next clean cut?
                            </h2>
                            <p className="mt-4 text-sm text-white/70">
                                Stop by or book online. We keep every slot on
                                time, so you can focus on your day.
                            </p>
                            <div className="mt-6 space-y-3 text-sm text-white/70">
                                <p>Jl. Sudirman No. 24, Pontianak</p>
                                <p>WhatsApp: 08xx-xxxx-xxxx</p>
                                <p>Email: hello@coolhead.com</p>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link
                                    href={auth.user ? dashboard() : login()}
                                    className="rounded-full bg-[var(--landing-red)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:-translate-y-0.5"
                                >
                                    Book a Seat
                                </Link>
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-black"
                                >
                                    Open Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="bg-[var(--landing-dark)] text-white/70">
                    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
                        <div>
                            <div className="flex items-center gap-3 text-white">
                                <div className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-sm font-semibold">
                                    CH
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                                        Coolhead
                                    </p>
                                    <p className="text-sm">Barbershop</p>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-white/60">
                                Luxury grooming for modern professionals. Clean
                                cuts, clear schedule, consistent results.
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
                                Studio
                            </p>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li>About</li>
                                <li>Booking</li>
                                <li>Pricing</li>
                                <li>Careers</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
                                Support
                            </p>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li>FAQ</li>
                                <li>Terms</li>
                                <li>Privacy</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
                                Visit
                            </p>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li>Mon - Sun</li>
                                <li>09:00 - 21:00</li>
                                <li>Pontianak</li>
                                <li>Indonesia</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10">
                        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/40 md:flex-row">
                            <p>Coolhead Barbershop. All rights reserved.</p>
                            <div className="flex items-center gap-4">
                                <span>Instagram</span>
                                <span>WhatsApp</span>
                                <span>Youtube</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
