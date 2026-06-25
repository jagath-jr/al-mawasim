"use client";

import React from "react";
import Image from "next/image";
import { Palette } from "lucide-react";
import { motion, Variants } from "framer-motion";

// ========================================
// 1. DATA MODELS & CONTENT
// ========================================

const heroData = {
  tagline: "Our Service",
  title: "Our Services",
  description: "Premium Curtains, Blinds & Interior Solutions Abu Dhabi",
  backgroundImage: "/services/bg-services.webp", // Update with your actual image path
};

type LayoutType = "textLeft" | "textLeftResponsive" | "imageLeft";

interface SubCard {
  title: string;
  desc: string;
  img: string;
}

interface ServiceSection {
  id: string;
  title: string;
  subtitle: React.ReactNode;
  description: React.ReactNode;
  image: string;
  layout: LayoutType;
  subSectionTitle?: string;
  subCards?: SubCard[];
}

const servicesData: ServiceSection[] = [
  {
    id: "curtains",
    title: "Curtains",
    subtitle: (
      <>
        Elegant Curtain Solutions for Residential &<br />
        Commercial Interiors
      </>
    ),
    description: (
      <>
        AL MAWASIM DECOR & CURTAINS provides custom curtains, office curtains, and motorized curtain solutions with premium fabrics and professional installation services across Abu Dhabi. Our curtain solutions are designed to enhance privacy, improve comfort, and complement modern interior styles. We serve homes, villas, offices, hotels, and commercial spaces with customized designs and quality craftsmanship.
      </>
    ),
    image: "/services/curtains-services.webp",
    layout: "textLeft",
    subSectionTitle: "Available Curtain Types",
    subCards: [
      {
        title: "Curtains",
        desc: "Custom curtain solutions designed to enhance privacy, comfort, and interior elegance for homes, villas, offices, hotels, and commercial spaces. We offer premium fabrics, stylish finishes, and customized designs tailored to every requirement.",
        img: "/services/curtains01-services.webp",
      },
      {
        title: "Office Curtains",
        desc: "Professional office curtain systems providing excellent light control, privacy, and stylish finishes for productive workspaces. We create customized solutions suitable for offices, meeting rooms, and commercial environments.",
        img: "/services/OfficeCurtains-services.webp",
      },
      {
        title: "Motorized Curtains",
        desc: "Modern motorized curtain systems designed for convenience, comfort, and effortless operation. These smart solutions are ideal for luxury homes, hotels, and offices and professional installation services across Abu Dhabi.",
        img: "/services/MotorizedCurtains-services.webp",
      },
      {
        title: "Roller Blinds",
        desc: "Stylish roller blinds offering effective light control, privacy, and modern functionality. Available in various colors and fabrics, they are suitable for homes and offices. Our roller blinds combine practicality with elegant interior aesthetics.",
        img: "/services/RollerBlinds-services.webp",
      },
      {
        title: "Zebra Blinds",
        desc: "Contemporary zebra blinds combine dual-layer fabrics with flexible light control and modern designs. They provide privacy while allowing natural light to enter interior spaces. These blinds are ideal for homes, villas, and offices.",
        img: "/services/ZebraBlinds-services.webp",
      },
      {
        title: "Vertical Blinds",
        desc: "Practical vertical blinds designed for offices, commercial spaces, and large windows. They offer smooth operation, privacy, and effective sunlight control. Our customized vertical blinds are available in different materials and finishes.",
        img: "/services/VerticalBlinds-services.webp",
      },
      {
        title: "Aluminum Venetian Blinds",
        desc: "Durable aluminum Venetian blinds provide precise light control and adjustable privacy. Their sleek appearance makes them suitable for modern interiors and workspaces. They are easy to maintain and designed for long-lasting performance.",
        img: "/services/AluminumVenetianBlinds-services.webp",
      },
    ],
  },
  {
    id: "furniture-upholstery",
    title: "Furniture & Upholstery",
    subtitle: (
      <>
        Premium Furniture Enhancement &<br />
        Upholstery Solutions
      </>
    ),
    description: (
      <>
        We provide sofa upholstery and custom furniture solutions using premium materials and expert craftsmanship. Our upholstery services help restore comfort, improve durability, and enhance interior aesthetics. We serve residential, commercial, hospitality, and office environments throughout Abu Dhabi.
      </>
    ),
    image: "/services/Furniture-Upholstery-services.webp",
    layout: "textLeftResponsive",
    subSectionTitle: "Available Furniture Solutions",
    subCards: [
      {
        title: "Sofa Upholstery",
        desc: "Professional sofa upholstery services designed to restore furniture with premium fabrics and elegant finishes. We help improve comfort, appearance, and durability for homes, offices, and hotels.",
        img: "/services/SofaUpholstery-services.webp",
      },
      {
        title: "Custom Furniture & Upholstery Solutions",
        desc: "Customized furniture upholstery solutions designed to complement different interior styles. We use quality materials and modern designs to create stylish and comfortable furniture. ",
        img: "/services/CustomFurnitureUpholsteryServices-services.webp",
      },
    ],
  },
  {
    id: "flooring",
    title: "Flooring Options",
    subtitle: (
      <>
        Durable Flooring Solutions for Modern<br />
        Interior Spaces
      </>
    ),
    description: (
      <>
        AL MAWASIM DECOR & CURTAINS provides SPC flooring, laminate flooring, and LVT flooring solutions for residential and commercial interiors. Our flooring systems combine durability, comfort, and stylish finishes. We deliver professional installation services tailored to every project.
      </>
    ),
    image: "/services/FlooringOptions-services.webp",
    layout: "imageLeft",
    subSectionTitle: "Available Flooring Types",
    subCards: [
      {
        title: "Laminate/Wood Flooring",
        desc: "Elegant laminate flooring that combines natural wood aesthetics with easy maintenance and durability. It is suitable for homes, offices, and apartments. Our flooring solutions provide long-lasting value and attractive finishes.",
        img: "/services/LaminateWoodFlooring-services.webp",
      },
      {
        title: "SPC Flooring",
        desc: "Waterproof SPC flooring designed for homes, offices, hotels, and commercial spaces. Its durability and resistance to wear make it ideal for high-traffic areas. We provide professional installation and premium materials for lasting performance.",
        img: "/services/SPCFlooring-services.webp",
      },
      {
        title: "LVT Flooring",
        desc: "Luxury vinyl tile flooring offers exceptional durability and modern aesthetics. It combines comfort, easy maintenance, and stylish finishes for residential and commercial interiors. Our LVT flooring solutions provide long-term value and performance.",
        img: "/services/LVTFlooring-services.webp",
      },
    ],
  },
  {
    id: "wall-finishes",
    title: "Wall Finishes",
    subtitle: (
      <>
        Decorative Wall Solutions for Beautiful<br />
        Residential & Commercial Spaces
      </>
    ),
    description: (
      <>
        Our wallpaper installation and wall finishing services add character, texture, and sophistication to interior spaces. We provide premium materials and professional workmanship for residential and commercial projects. Our solutions help create stylish and welcoming environments.
      </>
    ),
    image: "/services/WallFinishes-services.webp",
    layout: "textLeft",
    subSectionTitle: "Available Wall Finishes Types",
    subCards: [
      {
        title: "Decorative Wallpaper",
        desc: "Premium wallpaper solutions available in various textures, colors, and patterns. They add elegance and personality to homes, offices, hotels, and commercial spaces. We provide expert installation services for flawless finishes.",
        img: "/services/DecorativeWallpaper-services.webp",
      },
      {
        title: "Painting Services",
        desc: "Professional painting services delivering smooth finishes and long-lasting visual appeal. Our experienced team uses quality materials and modern techniques to achieve excellent results. We provide solutions for residential and commercial properties.",
        img: "/services/PaintingServices-services.webp",
      },
    ],
  },
  {
    id: "carpets",
    title: "Carpets & Rugs",
    subtitle: (
      <>
        Comfortable Flooring Environments for<br />
        Residential & Commercial Spaces
      </>
    ),
    description: (
      <>
        We provide quality carpets and custom carpet solutions designed to improve comfort and interior aesthetics. Our products are suitable for homes, offices, hotels, and commercial environments. We offer a variety of styles, textures, and finishes.
      </>
    ),
    image: "/services/Carpets-Rugs-services.webp",
    layout: "textLeftResponsive",
    subSectionTitle: "Available Carpets Types",
    subCards: [
      {
        title: "Carpets",
        desc: "Durable and comfortable carpet solutions designed to provide warmth and style. Our carpets are suitable for residential and commercial spaces. They are available in different colors, textures, and materials.",
        img: "/services/Carpets-services.webp",
      },
      {
        title: "Custom Carpet Solutions",
        desc: "Customized carpet options created to complement different interior designs and requirements. Our solutions enhance comfort while adding elegance to every environment. We provide quality materials and professional installation services.",
        img: "/services/CustomCarpetSolutions-services.webp",
      },
    ],
  },
  {
    id: "storage",
    title: "Storage & Interior Solutions",
    subtitle: (
      <>
        Custom Cabinets & Smart Storage Solutions for<br />
        Organized Spaces
      </>
    ),
    description: (
      <>
        AL MAWASIM DECOR & CURTAINS provides custom cupboards and wardrobe solutions designed to maximize storage and improve organization. Our solutions combine practicality, durability, and attractive finishes. We help create organized and functional interiors.
      </>
    ),
    image: "/services/Storage-InteriorSolutions-services.webp",
    layout: "imageLeft",
    subSectionTitle: "Available Storage Solutions",
    subCards: [
      {
        title: "Custom- Made Cupboards",
        desc: "Custom cupboard solutions designed to optimize storage space and improve functionality. Our designs are tailored to suit modern homes and offices. We provide quality materials and professional workmanship.",
        img: "/services/Custom-MadeCupboards-services.webp",
      },
      {
        title: "Wardrobes & Storage Units",
        desc: "Modern wardrobes and storage units created to maximize space utilization and organization. They are available in various styles and finishes to complement different interiors. Our solutions combine aesthetics with practical functionality.",
        img: "/services/Wardrobes-StorageUnits-services.webp",
      },
    ],
  },
];

// ========================================
// 2. ANIMATION VARIANTS
// ========================================

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// ========================================
// 3. PAGE COMPONENT
// ========================================

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-[#f8f9fc38] overflow-x-hidden">      
      {/* ========================================
        FIXED BACKGROUND IMAGE (Parallax)
        ========================================
      */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[linear-gradient(90deg,rgba(110,95,165,0.75)_0%,rgba(255,255,255,0)_100%)]">
        <Image
          src={heroData.backgroundImage}
          alt="Services Hero"
          fill
          className="object-cover opacity-60 mix-blend-multiply"
          priority
        />
      </div>

      {/* ========================================
        HERO TEXT CONTENT
        ========================================
      */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center pt-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          {/* Left Side */}
          <div className="space-y-4">
            <motion.span
              variants={fadeInUp}
              className="inline-block bg-white/20 backdrop-blur-sm text-white px-5 py-1.5 rounded-full text-sm font-medium"
            >
              {heroData.tagline}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white tracking-wide"
            >
              {heroData.title}
            </motion.h1>
          </div>

          {/* Right Side */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 md:mt-0 text-white md:text-right max-w-md lg:max-w-lg"
          >
            <p className="text-lg md:text-xl font-medium leading-snug drop-shadow-md lg:text-[#3b3470]">
              {heroData.description}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================
        MAIN CONTENT
        ========================================
      */}
      <div className="relative z-20 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-32">
        {/* Decorative Top Overlap Icon */}
        <motion.div
          initial={{ scale: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, x: "-50%", y: "-50%" }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
          className="absolute top-0 left-1/2 z-30 origin-center"
        >
          <div className="bg-[#4a398c] p-4 rounded-full border-[6px] border-white shadow-sm flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 space-y-24">
          {servicesData.map((section) => {
            const hasSubCards = section.subCards && section.subCards.length > 0;

            // Generate Layout specific classes based on enum
            const isResponsiveTextLeft = section.layout === "textLeftResponsive";
            const isImageLeft = section.layout === "imageLeft";

            const textContent = (
              <motion.div
                variants={isImageLeft ? slideInRight : slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className={isResponsiveTextLeft ? "order-2 lg:order-1" : undefined}
              >
                <h2 className="text-3xl font-bold text-[#4a398c] mb-2">
                  {section.title}
                </h2>
                <h3 className="text-lg font-semibold text-[#1e293b] mb-4">
                  {section.subtitle}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {section.description}
                </p>
              </motion.div>
            );

            const imageContent = (
              <motion.div
                variants={isImageLeft ? slideInLeft : slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className={`relative h-[250px] lg:h-[300px] w-full rounded-2xl overflow-hidden shadow-sm ${
                  isResponsiveTextLeft ? "order-1 lg:order-2" : ""
                }`}
              >
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            );

            return (
              <section
                key={section.id}
                className={
                  !hasSubCards ? "grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" : ""
                }
              >
                {/* Main Row Layer */}
                {hasSubCards ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
                    {isImageLeft ? (
                      <>
                        {imageContent}
                        {textContent}
                      </>
                    ) : (
                      <>
                        {textContent}
                        {imageContent}
                      </>
                    )}
                  </div>
                ) : isImageLeft ? (
                  <>
                    {imageContent}
                    {textContent}
                  </>
                ) : (
                  <>
                    {textContent}
                    {imageContent}
                  </>
                )}

                {/* Sub-Cards Layer (Rendered conditionally) */}
                {hasSubCards && (
                  <div className="pt-8">
                    <motion.h4
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="text-2xl font-semibold text-[#4a398c] text-center mb-10"
                    >
                      {section.subSectionTitle}
                    </motion.h4>

                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className={`grid grid-cols-1 sm:grid-cols-2 ${
                        section.subCards!.length === 2 || section.subCards!.length === 4
                          ? "lg:grid-cols-2 max-w-4xl mx-auto"
                          : "lg:grid-cols-3"
                      } gap-6 mb-6`}
                    >
                      {section.subCards!.map((card, idx) => (
                        <motion.div
                          key={idx}
                          variants={fadeInUp}
                          className="border border-[#e4e6fb] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow group"
                        >
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={card.img}
                              alt={card.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-5 text-center">
                            <h5 className="font-semibold text-[#1e293b] text-base mb-2">
                              {card.title}
                            </h5>
                            <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}