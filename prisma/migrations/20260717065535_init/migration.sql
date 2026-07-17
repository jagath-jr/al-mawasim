-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "layout" TEXT NOT NULL DEFAULT 'textLeft',
    "subSectionTitle" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCard" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "SubCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientProject" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "heroImage" TEXT NOT NULL DEFAULT '/contact/bg-contact.webp',
    "officeImage" TEXT NOT NULL DEFAULT '/contact/leftcontact.webp',
    "formTitle" TEXT NOT NULL DEFAULT 'Need Curtains, Blinds & Flooring Solutions in Abu Dhabi?',
    "formText" TEXT NOT NULL DEFAULT 'AL MAWASIM DECOR & CURTAINS provides custom curtains...',
    "address" TEXT NOT NULL DEFAULT 'Al Mawasim Decor
Business Bay, Dubai, UAE',
    "email" TEXT NOT NULL DEFAULT 'info@almawasimdecor.com',
    "phone1" TEXT NOT NULL DEFAULT '+971 56 677 3793',
    "phone2" TEXT NOT NULL DEFAULT '+971 55 521 8804',
    "workingHours" TEXT NOT NULL DEFAULT 'Mon - Fri 08.00 - 18.00',
    "footerText" TEXT NOT NULL DEFAULT 'AL MAWASIM DECOR & CURTAINS provides custom curtains, roller blinds, zebra blinds, vertical blinds, Venetian blinds, motorized curtains, SPC flooring, laminate flooring, wallpaper installation, and sofa upholstery services across Abu Dhabi, UAE.',
    "whatsapp" TEXT NOT NULL DEFAULT 'https://wa.me/971566773793',
    "instagram" TEXT NOT NULL DEFAULT 'https://www.instagram.com/almawasimdecore_curtains',
    "facebook" TEXT NOT NULL DEFAULT 'https://www.facebook.com/share/1E6L4Dd9i8/',
    "tiktok" TEXT NOT NULL DEFAULT 'https://www.tiktok.com/@almawasimdecore_curtains',
    "youtube" TEXT NOT NULL DEFAULT 'https://youtube.com/@almawasimdecoreandcurtains-llc',
    "linkedin" TEXT NOT NULL DEFAULT 'https://www.linkedin.com/in/almawasim-curtains-7737b5394',
    "xUrl" TEXT NOT NULL DEFAULT 'https://x.com/almawasim7737',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "heroImage" TEXT NOT NULL DEFAULT '/herobg-img.webp',
    "heroTitle" TEXT NOT NULL DEFAULT 'Premium Curtains & Blinds in Abu Dhabi',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'AL MAWASIM DECOR & CURTAINS provides custom curtains...',
    "aboutImage1" TEXT NOT NULL DEFAULT '/home/home-Our-Specialize-01.webp',
    "aboutImage2" TEXT NOT NULL DEFAULT '/home/home-Our-Specialize-02.webp',
    "aboutTitle" TEXT NOT NULL DEFAULT 'Trusted Curtains & Interior Decor Company in Abu Dhabi',
    "aboutDescription" TEXT NOT NULL DEFAULT 'AL MAWASIM DECOR & CURTAINS specializes in premium...',
    "statsProjects" INTEGER NOT NULL DEFAULT 500,
    "statsSatisfaction" INTEGER NOT NULL DEFAULT 100,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientLogo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientLogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "heroImage" TEXT NOT NULL DEFAULT '/about-us/aboutus-bg-img.webp',
    "heroTitle" TEXT NOT NULL DEFAULT 'About Us',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'Premium Curtains, Blinds & Interior Solutions Abu Dhabi',
    "welcomeBadge" TEXT NOT NULL DEFAULT 'Welcome',
    "welcomeTitle" TEXT NOT NULL DEFAULT 'Professional Curtains, Flooring & Wallpaper Services in Abu Dhabi',
    "welcomeText" TEXT NOT NULL DEFAULT 'Welcome to AL MAWASIM DECOR & CURTAINS LLC...',
    "gridImage1" TEXT NOT NULL DEFAULT '/about-us/aboutus-Welcome-img01.webp',
    "gridImage2" TEXT NOT NULL DEFAULT '/about-us/aboutus-Welcome-img02.webp',
    "statsProjects" INTEGER NOT NULL DEFAULT 500,
    "statsSatisfaction" INTEGER NOT NULL DEFAULT 100,
    "reasonsBadge" TEXT NOT NULL DEFAULT 'Top 6 Reasons',
    "reasonsTitle" TEXT NOT NULL DEFAULT 'Why Choose Us',
    "reasonsText" TEXT NOT NULL DEFAULT 'Whether you are looking for custom curtains, roller blinds...',
    "servicesBadge" TEXT NOT NULL DEFAULT 'Services Process',
    "servicesTitle" TEXT NOT NULL DEFAULT 'Industries We Serve in Abu Dhabi',
    "servicesText" TEXT NOT NULL DEFAULT 'AL MAWASIM DECOR & CURTAINS provides custom curtains...',
    "servicesImage" TEXT NOT NULL DEFAULT '/about-us/aboutl-us-services.png',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "SubCard" ADD CONSTRAINT "SubCard_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
