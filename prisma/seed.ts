import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

function generatePassword(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  const bytes = randomBytes(12);
  let out = "";
  for (let i = 0; i < 12; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

type SeedVehicle = {
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  seats: number;
  transmission: "MANUAL" | "AUTO";
  fuel: "PETROL" | "DIESEL";
  dailyRateMzn: number;
  description: string;
  mainImage: string;
  images: string[];
};

const VEHICLES: SeedVehicle[] = [
  {
    slug: "toyota-corolla",
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    category: "SEDAN",
    seats: 5,
    transmission: "AUTO",
    fuel: "PETROL",
    dailyRateMzn: 3500,
    description:
      "Sedan equilibrado, confortável e económico. Ideal para deslocações urbanas em Quelimane e viagens pela província da Zambézia. Ar condicionado, bluetooth e porta-bagagens espaçoso.",
    mainImage:
      "https://images.unsplash.com/photo-1623006772851-a30e9eafa0b1?w=1600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1623006772851-a30e9eafa0b1?w=1600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1600&auto=format&fit=crop&q=80"
    ]
  },
  {
    slug: "toyota-hilux",
    brand: "Toyota",
    model: "Hilux",
    year: 2023,
    category: "PICKUP",
    seats: 5,
    transmission: "MANUAL",
    fuel: "DIESEL",
    dailyRateMzn: 6500,
    description:
      "A pickup mais fiável para estradas de Moçambique. Tração 4x4, caixa de carga ampla e consumo de gasóleo favorável. Preparada para zonas de difícil acesso.",
    mainImage:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&auto=format&fit=crop&q=80"
    ]
  },
  {
    slug: "toyota-land-cruiser",
    brand: "Toyota",
    model: "Land Cruiser",
    year: 2022,
    category: "SUV_4X4",
    seats: 7,
    transmission: "AUTO",
    fuel: "DIESEL",
    dailyRateMzn: 9500,
    description:
      "O 4x4 de referência para viagens longas e terrenos exigentes. Interior premium, sete lugares e tração permanente. Perfeito para safaris e viagens pela costa.",
    mainImage:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&auto=format&fit=crop&q=80"
    ]
  },
  {
    slug: "mitsubishi-pajero",
    brand: "Mitsubishi",
    model: "Pajero",
    year: 2021,
    category: "SUV_4X4",
    seats: 7,
    transmission: "AUTO",
    fuel: "DIESEL",
    dailyRateMzn: 8500,
    description:
      "SUV robusto com tração 4x4, sete lugares e grande capacidade off-road. Boa opção para equipas e famílias que precisam de conforto fora dos asfaltos.",
    mainImage:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&auto=format&fit=crop&q=80"
    ]
  },
  {
    slug: "nissan-hardbody",
    brand: "Nissan",
    model: "Hardbody",
    year: 2020,
    category: "PICKUP",
    seats: 5,
    transmission: "MANUAL",
    fuel: "DIESEL",
    dailyRateMzn: 5500,
    description:
      "Pickup resistente, popular em Moçambique pela sua simplicidade e peças fáceis de encontrar. Boa escolha para transporte de carga e trabalho no campo.",
    mainImage:
      "https://images.unsplash.com/photo-1595438556679-cafbbe9d5f27?w=1600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1595438556679-cafbbe9d5f27?w=1600&auto=format&fit=crop&q=80"
    ]
  },
  {
    slug: "hyundai-tucson",
    brand: "Hyundai",
    model: "Tucson",
    year: 2022,
    category: "SUV",
    seats: 5,
    transmission: "AUTO",
    fuel: "PETROL",
    dailyRateMzn: 5000,
    description:
      "SUV moderno com design elegante, bom nível de conforto e tecnologia a bordo. Equilíbrio entre consumo e espaço, adequado para cidade e viagens médias.",
    mainImage:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&auto=format&fit=crop&q=80"
    ]
  },
  {
    slug: "hyundai-h1",
    brand: "Hyundai",
    model: "H1",
    year: 2021,
    category: "VAN",
    seats: 9,
    transmission: "MANUAL",
    fuel: "DIESEL",
    dailyRateMzn: 7500,
    description:
      "Minibus com nove lugares, ideal para grupos, transferes de aeroporto e viagens em família. Boa altura ao solo e porta lateral de correr.",
    mainImage:
      "https://images.unsplash.com/photo-1600661653561-629509216228?w=1600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1600661653561-629509216228?w=1600&auto=format&fit=crop&q=80"
    ]
  },
  {
    slug: "kia-picanto",
    brand: "Kia",
    model: "Picanto",
    year: 2023,
    category: "HATCHBACK",
    seats: 4,
    transmission: "MANUAL",
    fuel: "PETROL",
    dailyRateMzn: 2500,
    description:
      "Citadino económico, fácil de estacionar e com consumo baixo. Opção prática para quem precisa de mobilidade rápida dentro de Quelimane.",
    mainImage:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1600&auto=format&fit=crop&q=80"
    ]
  }
];

async function main() {
  const email = (process.env.ADMIN_SEED_EMAIL ?? "admin@kakeylka.co.mz").toLowerCase();
  const password = process.env.ADMIN_SEED_PASSWORD ?? "123456";

  const existingAdmin = await prisma.user.findUnique({ where: { email } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: { email, passwordHash, name: "Administração" }
    });
    console.log("");
    console.log("╔══════════════════════════════════════════════════╗");
    console.log("║  ADMIN KAKEYLKA CRIADO — GUARDA ESTAS CREDENCIAIS ║");
    console.log("╠══════════════════════════════════════════════════╣");
    console.log(`║  Email:    ${email.padEnd(38)}║`);
    console.log(`║  Password: ${password.padEnd(38)}║`);
    console.log("╠══════════════════════════════════════════════════╣");
    console.log("║  Entra em /admin/login e muda a password          ║");
    console.log("║  depois em /admin/definicoes                      ║");
    console.log("╚══════════════════════════════════════════════════╝");
    console.log("");
  } else {
    console.log(`• Admin já existe: ${email}`);
  }

  for (const v of VEHICLES) {
    const existing = await prisma.vehicle.findUnique({ where: { slug: v.slug } });
    if (existing) {
      console.log(`• Viatura já existe: ${v.slug}`);
      continue;
    }
    await prisma.vehicle.create({
      data: {
        slug: v.slug,
        brand: v.brand,
        model: v.model,
        year: v.year,
        category: v.category,
        seats: v.seats,
        transmission: v.transmission,
        fuel: v.fuel,
        dailyRateMzn: v.dailyRateMzn,
        description: v.description,
        mainImage: v.mainImage,
        status: "AVAILABLE",
        images: {
          create: v.images.map((url, order) => ({ url, order }))
        }
      }
    });
    console.log(`✓ Viatura criada: ${v.brand} ${v.model}`);
  }

  await prisma.settings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      phone: "+258 84 411 6974",
      whatsapp: "258844116974",
      email: "",
      address: "Avenida de Maputo, Quelimane, Moçambique",
      hoursText: "Segunda a Domingo · 07h00 — 18h00"
    },
    update: {}
  });
  console.log(`✓ Definições prontas`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
