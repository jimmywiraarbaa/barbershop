import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const navLinks = [
    { label: 'Home', href: '#top' },
    { label: 'Services', href: '#services' },
    // { label: 'Find Us', href: '#map' },
    // { label: 'Testimonials', href: '#testimonials' },
    { label: 'Capster', href: '#team' },
    { label: 'Contact', href: '#contact' },
];

const stats = [
    { label: 'Capster aktif', value: '4' },
    { label: 'Open daily', value: '09.00 - 23.00' },
];

const services = [
    {
        title: 'Signature Fade',
        detail: 'Fade clean, garis tajam.',
        price: 'Rp 85k',
    },
    {
        title: 'Beard Architecture',
        detail: 'Beard rapi, line up on point.',
        price: 'Rp 55k',
    },
    {
        title: 'Scalp Refresh',
        detail: 'Wash + massage, finish fresh.',
        price: 'Rp 45k',
    },
];

const testimonials = [
    {
        name: 'Raka W',
        role: 'Regular Client',
        quote: 'Booking gampang, hasil clean.',
    },
    {
        name: 'Alvin S',
        role: 'Entrepreneur',
        quote: 'Datang on time, pulang fresh.',
    },
    {
        name: 'Dimas H',
        role: 'Athlete',
        quote: 'Fast cut, no drama.',
    },
];

const teamMembers = [
    {
        name: 'Ronaldo F',
        role: 'Lead Barber',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    },
    {
        name: 'Jenna S',
        role: 'Style Curator',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    },
    {
        name: 'Irfan K',
        role: 'Fade Specialist',
        image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80',
    },
    {
        name: 'Ayu M',
        role: 'Grooming Pro',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    },
];

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                            url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
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
                <header
                    className={`fixed top-0 left-0 right-0 z-50 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-white transition-all duration-300 ${
                        isScrolled
                            ? 'mx-4 mt-2 bg-black/70 backdrop-blur-md border border-white/10 rounded-full shadow-lg'
                            : ''
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <div>
                            <p className="text-xs tracking-[0.4em] text-white/60 uppercase">
                                Coolhead
                            </p>
                            <p className="text-sm font-medium">
                                Barbershop
                            </p>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-6 text-xs tracking-[0.3em] text-white/70 uppercase lg:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="transition hover:text-white mix-blend-difference"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden items-center gap-2 lg:flex">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white uppercase transition hover:bg-white hover:text-black"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white uppercase transition hover:bg-white hover:text-black"
                                >
                                    Masuk
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="rounded-full bg-[var(--landing-red)] px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white uppercase shadow-[0_18px_40px_-20px_rgba(215,38,61,0.8)] transition hover:-translate-y-0.5"
                                    >
                                        Daftar
                                    </Link>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile Burger Button */}
                    <button
                        className="lg:hidden flex flex-col items-center justify-center gap-1.5 text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                        />
                        <span
                            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                                isMobileMenuOpen ? 'opacity-0' : ''
                            }`}
                        />
                        <span
                            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                        />
                    </button>
                </header>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-lg transition-all duration-300 lg:hidden ${
                        isMobileMenuOpen
                            ? 'opacity-100 pointer-events-auto'
                            : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
                        <nav className="flex flex-col items-center gap-6 text-center">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-xl font-medium tracking-widest text-white uppercase transition hover:text-white/70"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <div className="flex flex-col items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="w-full rounded-full bg-[var(--landing-red)] px-8 py-3 text-sm font-semibold tracking-widest text-white uppercase transition hover:-translate-y-0.5"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="w-full rounded-full border border-white/40 px-8 py-3 text-sm font-semibold tracking-widest text-white uppercase transition hover:bg-white hover:text-black"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Masuk
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="w-full rounded-full bg-[var(--landing-red)] px-8 py-3 text-sm font-semibold tracking-widest text-white uppercase shadow-[0_18px_40px_-20px_rgba(215,38,61,0.8)] transition hover:-translate-y-0.5"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Daftar
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="landing-hero relative">
                    <main className="mx-auto grid max-w-6xl gap-12 px-6 pt-28 pb-24 text-white lg:grid-cols-[1.05fr_0.95fr]">
                        <div
                            className="fade-up"
                            style={{ animationDelay: '120ms' }}
                        >
                            <p className="text-xs tracking-[0.5em] text-white/70 uppercase">
                                Clean Cut, Good Vibes
                            </p>
                            <h1 className="section-title mt-4 text-4xl leading-tight font-semibold md:text-6xl">
                                Cut rapi, vibe naik
                                <span className="block text-white/70">
                                    Stay fresh, stay chill
                                </span>
                            </h1>
                            <p className="mt-5 max-w-xl text-sm text-white/75 md:text-base">
                                Datang, duduk, selesai. Fast, clean, on time.
                                Pilih capster, booking slot, langsung gas.
                            </p>
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <Link
                                    href={auth.user ? dashboard() : '/booking-barber'}
                                    className="rounded-full bg-[var(--landing-red)] px-6 py-3 text-xs font-semibold tracking-[0.25em] text-white uppercase shadow-[0_18px_40px_-20px_rgba(215,38,61,0.8)] transition hover:-translate-y-0.5"
                                >
                                    Booking Slot
                                </Link>
                                <a
                                    href="#services"
                                    className="rounded-full border border-white/40 px-6 py-3 text-xs font-semibold tracking-[0.25em] text-white uppercase transition hover:bg-white hover:text-black"
                                >
                                    Lihat List
                                </a>
                            </div>
                            <div className="mt-10 grid gap-4 md:grid-cols-2">
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
                    </main>
                </div>

                <section className="relative">
                    <div className="bg-[var(--landing-red)]">
                        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-6 text-center">
                            <p className="ribbon-text">COOLHEAD BARBER VIBES</p>
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
                    id="services"
                    className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 md:grid-cols-[1.05fr_0.95fr]"
                >
                    <div
                        className="fade-up"
                        style={{ animationDelay: '180ms' }}
                    >
                        <p className="text-xs tracking-[0.4em] text-[var(--landing-muted)] uppercase">
                            Services
                        </p>
                        <h2 className="section-title mt-4 text-3xl font-semibold md:text-4xl">
                            Menu simpel, hasil clean
                            <span className="text-[var(--landing-blue)]">
                                Pick your vibe.
                            </span>
                        </h2>
                        <p className="mt-4 text-sm text-[var(--landing-muted)] md:text-base">
                            Fade, beard, refresh. Semua konsisten.
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
                        <div className="absolute right-6 -bottom-6 rounded-2xl bg-[var(--landing-red)] px-4 py-3 text-xs font-semibold tracking-[0.25em] text-white uppercase">
                            Clean & Sharp
                        </div>
                    </div>
                </section>


                <section id="team" className="mx-auto max-w-6xl px-6 py-16">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <p className="text-xs tracking-[0.4em] text-[var(--landing-muted)] uppercase">
                            Meet the crew
                        </p>
                        <h2 className="section-title text-3xl font-semibold md:text-4xl">
                            Capster pilihan, detail first
                            <span className="text-[var(--landing-blue)]">
                                no drama.
                            </span>
                        </h2>
                        <p className="max-w-2xl text-sm text-[var(--landing-muted)]">
                            Skill konsisten, vibes friendly.
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


                <section
                    id="difference"
                    className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 md:grid-cols-[0.9fr_1.1fr]"
                >
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80"
                            alt="Barbershop interior"
                            className="h-[360px] w-full rounded-[30px] object-cover grayscale"
                            loading="lazy"
                        />
                        <div className="absolute -bottom-6 left-6 rounded-2xl bg-[var(--landing-blue)] px-4 py-3 text-xs font-semibold tracking-[0.25em] text-white uppercase">
                            Chill Spot
                        </div>
                    </div>
                    <div
                        className="fade-up"
                        style={{ animationDelay: '160ms' }}
                    >
                        <p className="text-xs tracking-[0.4em] text-[var(--landing-muted)] uppercase">
                            Why us
                        </p>
                        <h2 className="section-title mt-4 text-3xl font-semibold md:text-4xl">
                            Detail first, service chill
                            <span className="text-[var(--landing-red)]">
                                No ngantri lama.
                            </span>
                        </h2>
                        <p className="mt-4 text-sm text-[var(--landing-muted)] md:text-base">
                            Slot jelas, flow rapi. Kamu duduk, kita beresin.
                        </p>
                        <div className="mt-6 grid gap-3 text-sm text-[var(--landing-muted)] md:grid-cols-2">
                            <div className="rounded-2xl border border-black/10 bg-[var(--landing-soft-blue)]/60 p-4">
                                Hygiene on point.
                            </div>
                            <div className="rounded-2xl border border-black/10 bg-[var(--landing-soft-red)]/70 p-4">
                                Slot booking jelas.
                            </div>
                            <div className="rounded-2xl border border-black/10 bg-white p-4">
                                Produk premium.
                            </div>
                            <div className="rounded-2xl border border-black/10 bg-white p-4">
                                Lounge comfy.
                            </div>
                        </div>
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
                            <p className="text-xs tracking-[0.4em] text-white/60 uppercase">
                                Contact
                            </p>
                            <h2 className="section-title mt-4 text-3xl font-semibold">
                                Ready for fresh cut?
                            </h2>
                            <p className="mt-4 text-sm text-white/70">
                                Datang langsung atau book online. Slot on time.
                            </p>
                            <div className="mt-6 space-y-3 text-sm text-white/70">
                                <p>Jl. Sudirman No. 24, Pontianak</p>
                                <p>WhatsApp: 08xx-xxxx-xxxx</p>
                                <p>Email: hello@coolhead.com</p>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link
                                    href={auth.user ? dashboard() : '/booking-barber'}
                                    className="rounded-full bg-[var(--landing-red)] px-5 py-2 text-xs font-semibold tracking-[0.25em] text-white uppercase transition hover:-translate-y-0.5"
                                >
                                    Book Slot
                                </Link>
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold tracking-[0.25em] text-white uppercase transition hover:bg-white hover:text-black"
                                >
                                    Open Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </section>


                <section
                    id="map"
                    className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr]"
                >
                    <div
                        className="fade-up"
                        style={{ animationDelay: '140ms' }}
                    >
                        <p className="text-xs tracking-[0.4em] text-[var(--landing-muted)] uppercase">
                            Find us
                        </p>
                        <h2 className="section-title mt-4 text-3xl font-semibold md:text-4xl">
                            Dekat, easy to reach
                            <span className="block text-[var(--landing-blue)]">
                                City center vibes.
                            </span>
                        </h2>
                        <p className="mt-4 text-sm text-[var(--landing-muted)] md:text-base">
                            Walk in atau book dulu. Akses gampang, tempatnya
                            chill, mood naik.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href="#contact"
                                className="rounded-full bg-[var(--landing-blue)] px-5 py-2 text-xs font-semibold tracking-[0.25em] text-white uppercase transition hover:-translate-y-0.5"
                            >
                                Open Maps
                            </a>
                            <a
                                href="#services"
                                className="rounded-full border border-black/10 px-5 py-2 text-xs font-semibold tracking-[0.25em] text-[var(--landing-ink)] uppercase transition hover:-translate-y-0.5"
                            >
                                Lihat Menu
                            </a>
                        </div>
                    </div>
                    <div className="relative">
                        <div
                            className="relative h-[340px] rounded-[32px] border border-black/10 bg-[#0d0f14]"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), radial-gradient(circle at 30% 20%, rgba(29,78,216,0.3), transparent 40%), radial-gradient(circle at 70% 60%, rgba(215,38,61,0.35), transparent 45%)',
                                backgroundSize:
                                    '28px 28px, 28px 28px, cover, cover',
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
                                Coolhead Studio
                            </div>
                        </div>
                        <div className="absolute right-6 -bottom-8 hidden rounded-3xl border border-black/10 bg-white px-4 py-3 text-xs text-[var(--landing-muted)] shadow-lg md:block">
                            Open daily, walk-in ok.
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
                                    <p className="text-xs tracking-[0.4em] text-white/50 uppercase">
                                        Coolhead
                                    </p>
                                    <p className="text-sm">Barbershop</p>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-white/60">
                                Clean cuts, clear schedule, good vibes.
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold tracking-[0.3em] text-white uppercase">
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
                            <p className="text-xs font-semibold tracking-[0.3em] text-white uppercase">
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
                            <p className="text-xs font-semibold tracking-[0.3em] text-white uppercase">
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
