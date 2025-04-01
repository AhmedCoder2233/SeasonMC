"use client";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useAnimation,
} from "framer-motion";
import {
  FaUser,
  FaShoppingCart,
  FaUsers,
  FaBook,
  FaChevronDown,
  FaDiscord,
  FaServer,
  FaTrophy,
  FaGift,
  FaCrown,
  FaGlobe,
  FaHeart,
  FaSnowflake,
} from "react-icons/fa";
import {
  GiChest,
  GiSwordman,
  GiLockedChest,
  GiMinerals,
  GiMineWagon,
  GiMineExplosion,
  GiTreasureMap,
  GiSpellBook,
  GiSwordsEmblem,
  GiIceSpellCast,
  GiSnowflake1,
  GiSnowflake2,
} from "react-icons/gi";
import { RiSwordFill } from "react-icons/ri";
import { BsSnow, BsSnow2, BsSnow3 } from "react-icons/bs";
import { IoMdSnow } from "react-icons/io";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simulate loading progress with more realistic timing
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + (2 + Math.random() * 5);
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Premium Snowfall Effect Component
  const SnowParticle = ({ style, hero = false }: any) => {
    if (!isClient) return null;

    const particleTypes = [
      <FaSnowflake key="f1" />,
      <GiSnowflake1 key="f2" />,
      <GiSnowflake2 key="f3" />,
      <BsSnow key="f4" />,
      <BsSnow2 key="f5" />,
      <BsSnow3 key="f6" />,
      <IoMdSnow key="f7" />,
      <GiIceSpellCast key="f8" />,
    ];

    const randomType =
      particleTypes[Math.floor(Math.random() * particleTypes.length)];

    return (
      <motion.div
        className={`absolute text-white pointer-events-none ${
          hero ? "z-20" : "z-0"
        }`}
        style={style}
        initial={{ y: -10, opacity: 0 }}
        animate={{
          y: isClient ? window.innerHeight + 10 : 0,
          opacity: [0, 1, 0],
          x: style.x + Math.sin(style.y * 0.01) * 50,
          rotate: Math.random() * 360,
          transition: {
            duration: hero ? 15 + Math.random() * 10 : 10 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          },
        }}
      >
        {randomType}
      </motion.div>
    );
  };

  // Create snow particles with different properties
  const generalSnowParticles = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 0.2 + Math.random() * 1.5,
    speed: 10 + Math.random() * 20,
  }));

  // Special snow particles for hero section
  const heroSnowParticles = Array.from({ length: 50 }).map((_, i) => ({
    id: `hero-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 0.5 + Math.random() * 2.5,
    speed: 15 + Math.random() * 25,
    hero: true,
  }));

  // Auto-rotate features with smooth transitions
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loading]);

  // Enhanced rules with icons
  const rulesCategories = {
    "General Rules": [
      { text: "No hacking or cheating of any kind", icon: <GiSpellBook /> },
      { text: "Be respectful to all players", icon: <FaHeart /> },
      { text: "No griefing or stealing", icon: <GiMineExplosion /> },
      { text: "Keep the server family-friendly", icon: <FaUsers /> },
      { text: "Follow staff instructions", icon: <FaCrown /> },
    ],
    "PvP Rules": [
      { text: "No combat logging", icon: <RiSwordFill /> },
      { text: "No unfair traps", icon: <GiTreasureMap /> },
      { text: "Respect spawn zones", icon: <FaGlobe /> },
      { text: "No excessive camping", icon: <GiSwordsEmblem /> },
      { text: "Keep PvP fair and fun", icon: <FaTrophy /> },
    ],
    "Economy Rules": [
      { text: "No scamming players", icon: <FaShoppingCart /> },
      { text: "No exploiting the economy", icon: <GiMineWagon /> },
      { text: "Fair shop prices", icon: <GiChest /> },
      { text: "No artificial inflation", icon: <GiLockedChest /> },
      { text: "Respect market values", icon: <GiMinerals /> },
    ],
  };

  // Premium features with enhanced visuals
  const features = [
    {
      icon: <GiMineWagon className="text-6xl text-yellow-400" />,
      title: "Survival Economy",
      description:
        "Engage in our player-driven economy with shops, auctions, and a dynamic market system that evolves with player activity",
      color: "from-yellow-600/20 to-yellow-800/20",
      bgImage: "bg-[url('/banner3.jpg')]",
    },
    {
      icon: <GiSwordman className="text-6xl text-red-400" />,
      title: "PvP Arenas",
      description:
        "Compete in our ranked PvP battle arenas with seasonal tournaments and exclusive rewards for top players",
      color: "from-red-600/20 to-red-800/20",
      bgImage: "bg-[url('/banner1.jpg')]",
    },
    {
      icon: <GiChest className="text-6xl text-green-400" />,
      title: "Daily Rewards",
      description:
        "Login daily to claim increasingly valuable rewards, including exclusive cosmetics and rare items",
      color: "from-green-600/20 to-green-800/20",
      bgImage: "bg-[url('/banner2.jpg')]",
    },
    {
      icon: <GiLockedChest className="text-6xl text-purple-400" />,
      title: "Rare Loot",
      description:
        "Discover hidden treasures containing legendary items, rare artifacts, and unique collectibles",
      color: "from-purple-600/20 to-purple-800/20",
      bgImage: "bg-[url('/banner4.jpg')]",
    },
  ];

  // Enhanced server stats
  const serverStats = [
    {
      value: "200+",
      label: "Active Players",
      icon: <FaUser className="text-pink-400" />,
      description: "Daily active community members",
    },
    {
      value: "99.9%",
      label: "Uptime",
      icon: <FaServer className="text-green-400" />,
      description: "Reliable server performance",
    },
    {
      value: "10+",
      label: "Unique Ranks",
      icon: <FaTrophy className="text-yellow-400" />,
      description: "Custom progression system",
    },
    {
      value: "3 Years",
      label: "Running",
      icon: <FaDiscord className="text-blue-400" />,
      description: "Established community since 2020",
    },
  ];

  // Premium staff members data
  const staffMembers = [
    {
      name: "Owner • Ike",
      role: "Owner",
      online: true,
      avatar: "/skinmc-avatar (5).png",
      since: "2020",
      specialty: "Server Management",
    },
    {
      name: "Owner • inputcost",
      role: "Owner",
      online: true,
      avatar: "/skinmc-avatar (1).png",
      since: "2020",
      specialty: "Server Management",
    },
    {
      name: "Co Owner • Crafty",
      role: "Co-Owner",
      online: true,
      avatar: "/skinmc-avatar (2).png",
      since: "2021",
      specialty: "Server Management",
    },
    {
      name: "Co Owner • Elian",
      role: "Co-Owner",
      online: false,
      avatar: "/skinmc-avatar (3).png",
      since: "2022",
      specialty: "Community Support",
    },
    {
      name: "C.E.O • yamiyo",
      role: "C.E.O",
      online: true,
      avatar: "/skinmc-avatar (4).png",
      since: "2021",
      specialty: "C.E.O Management",
    },
    {
      name: "Admin • lex",
      role: "Admin",
      online: true,
      avatar: "/skinmc-avatar (6).png",
      since: "2021",
      specialty: "Customer Support",
    },
    {
      name: "Admin • Sanjiro",
      role: "Admin",
      online: true,
      avatar: "/skinmc-avatar (7).png",
      since: "2021",
      specialty: "Customer Support",
    },
    {
      name: "Helper • ike",
      role: "Helper",
      online: true,
      avatar: "/skinmc-avatar (8).png",
      since: "2021",
      specialty: "Customer Support",
    },
    {
      name: "Manager • Lemonsuke",
      role: "Manager",
      online: true,
      avatar: "/skinmc-avatar (9).png",
      since: "2021",
      specialty: "Customer Support",
    },
    {
      name: "Moderator • supro",
      role: "Moderator",
      online: true,
      avatar: "/skinmc-avatar (10).png",
      since: "2021",
      specialty: "Customer Support",
    },
  ];

  // Premium recent players data
  const recentPlayers = [
    {
      name: "DiamondMiner",
      status: "Mining",
      online: true,
      rank: "Elite",
      playtime: "1,200h",
    },
    {
      name: "PvPKing",
      status: "In Arena",
      online: true,
      rank: "Champion",
      playtime: "850h",
    },
    {
      name: "RedstonePro",
      status: "Building",
      online: false,
      rank: "Architect",
      playtime: "1,500h",
    },
    {
      name: "TraderJoe",
      status: "Shopping",
      online: true,
      rank: "Tycoon",
      playtime: "2,300h",
    },
  ];

  // Premium Server IP Component
  const ServerIPSection = () => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
      navigator.clipboard.writeText("play.seasonmc.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <motion.div className="relative mt-8 bg-black/40 rounded-xl p-4 border border-pink-700/50 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaServer className="text-pink-400 mr-3 text-xl" />
            <div>
              <p className="text-pink-300 text-sm">Server IP</p>
              <p className="font-mono text-white">play.seasonmc.com</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyToClipboard}
            className={`bg-pink-700 hover:bg-pink-600 px-4 py-2 rounded-lg text-sm transition-colors ${
              copied ? "bg-green-600 hover:bg-green-600" : ""
            }`}
          >
            {copied ? "Copied!" : "Copy IP"}
          </motion.button>
        </div>

        {/* Premium route visualization */}
        <div className="mt-4">
          <div className="relative w-full h-2 bg-pink-900/50 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-between px-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-white rounded-full opacity-70"
                />
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-pink-300 text-xs mt-2">
          Connecting players worldwide...
        </p>
      </motion.div>
    );
  };

  // Premium decorative elements
  const FloatingDecorations = () => (
    <>
      <motion.div
        className="absolute bottom-10 left-1/4 text-4xl text-pink-400/20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <GiMinerals />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-20 text-5xl text-purple-400/20"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <GiSwordman />
      </motion.div>

      <motion.div
        className="absolute top-1/4 left-20 text-4xl text-blue-400/20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.8,
        }}
      >
        <GiTreasureMap />
      </motion.div>
    </>
  );

  // Premium Loading Animation
  const LoadingScreen = () => (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-b from-pink-900 to-black z-50 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Loading screen snow */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {generalSnowParticles.slice(0, 10).map((flake) => (
            <SnowParticle
              key={`load-${flake.id}`}
              style={{
                left: `${flake.x}%`,
                fontSize: `${flake.size * 0.2}rem`,
                filter: `blur(${Math.random() * 2}px)`,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{
          scale: [0.8, 1.05, 1],
          rotate: [-5, 2, 0],
          transition: {
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
        className="relative w-64 h-64 sm:w-96 sm:h-96"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 opacity-20 blur-xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 180, 360],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="SeasonMC Logo"
            width={400}
            height={400}
            className="z-10 animate-pulse-slow hover:rotate-[5deg] transition-transform duration-500"
            priority
          />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.8,
            type: "spring",
            stiffness: 100,
          },
        }}
        className="text-3xl sm:text-4xl font-bold mt-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
      >
        Loading SeasonMC
      </motion.h1>

      {/* Premium loading bar without percentage */}
      <motion.div
        className="w-64 sm:w-96 h-3 bg-pink-900/50 rounded-full mt-8 overflow-hidden relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${loadProgress}%` }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute top-0 right-0 h-full w-1 bg-white opacity-70"
            animate={{
              opacity: [0, 1, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
              },
            }}
          />
        </motion.div>
      </motion.div>

      <motion.p
        className="text-pink-400 mt-4 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.2 } }}
      >
        Preparing an amazing adventure...
      </motion.p>
    </motion.div>
  );

  return (
    <>
      <Head>
        <title>SeasonMC | Premium Minecraft Server</title>
        <meta
          name="description"
          content="Join the most exciting Minecraft survival experience with economy, PvP and community events!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Loading Animation */}
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {/* Main Content */}
      {!loading && (
        <motion.div
          ref={containerRef}
          className="min-h-screen bg-gradient-to-b from-pink-900/90 via-purple-900/70 to-black text-white relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* General Snow Effect */}
          {isClient && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {generalSnowParticles.map((flake) => (
                <SnowParticle
                  key={flake.id}
                  style={{
                    left: `${flake.x}%`,
                    y: flake.y,
                    fontSize: `${flake.size}rem`,
                    filter: `blur(${Math.random() * 3}px)`,
                    opacity: 0.7 + Math.random() * 0.3,
                  }}
                />
              ))}
            </div>
          )}

          {/* Hero-specific snow effect */}
          {isClient && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
              {heroSnowParticles.map((flake) => (
                <SnowParticle
                  key={flake.id}
                  style={{
                    left: `${flake.x}%`,
                    y: flake.y,
                    fontSize: `${flake.size}rem`,
                    filter: `blur(${Math.random() * 1}px)`,
                    opacity: 0.8,
                  }}
                  hero={true}
                />
              ))}
            </div>
          )}

          {/* Parallax background with animated gradient */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: backgroundY }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-pink-900/90 via-purple-900/70 to-black" />
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
                transition: {
                  duration: 30,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                },
              }}
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, #ff00aa, #00aaff)",
                backgroundSize: "200% 200%",
              }}
            />
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            {/* Premium Header with Logo */}
            <motion.header
              className="py-6 px-6 absolute top-0 left-0 right-0 z-30"
              initial={{ y: -100 }}
              animate={{ y: 0, transition: { delay: 0.5, type: "spring" } }}
            >
              <div className="container mx-auto flex justify-between items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.7 } }}
                  className="flex items-center"
                >
                  <Image
                    src="/headlogo.png"
                    alt="SeasonMC Logo"
                    width={50}
                    height={50}
                    className="mr-3 hover:rotate-12 transition-transform"
                  />
                  <span className="hidden sm:flex text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                    SeasonMC
                  </span>
                </motion.div>

                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#db2777" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-pink-700 px-4 py-2 rounded-lg text-sm flex items-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.8 } }}
                  >
                    <FaUser className="inline mr-2" /> Login
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#7e22ce",
                      boxShadow: "0 0 15px rgba(167, 139, 250, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-purple-700 px-4 py-2 rounded-lg text-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.9 } }}
                  >
                    Register
                  </motion.button>
                </div>
              </div>
            </motion.header>

            {/* Premium Hero Section with Special Snow Effect */}
            <section className="relative min-h-screen flex items-center justify-center px-6 text-center pt-20 overflow-hidden">
              {/* Hero-specific snow effect */}
              {isClient && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                  {heroSnowParticles.map((flake) => (
                    <SnowParticle
                      key={flake.id}
                      style={{
                        left: `${flake.x}%`,
                        y: flake.y,
                        fontSize: `${flake.size}rem`,
                        filter: `blur(${Math.random() * 1}px)`,
                        opacity: 0.8,
                      }}
                      hero={true}
                    />
                  ))}
                </div>
              )}

              <div className="relative z-30 max-w-6xl mx-auto">
                {/* Floating particles */}
                <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-pink-600/20 blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-purple-600/20 blur-3xl"></div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.7,
                    type: "spring",
                    damping: 10,
                  }}
                  className="mb-8 relative"
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                >
                  <Image
                    src="/logo.png"
                    alt="SeasonMC Main Logo"
                    width={600}
                    height={300}
                    className="mx-auto w-full max-w-2xl transition-all duration-500 cursor-pointer hover:drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]"
                    priority
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-pink-600/20 blur-xl -z-10"
                    animate={{
                      scale: isHovering ? 1.2 : 1,
                      opacity: isHovering ? 0.6 : 0.3,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>

                <motion.p
                  className="text-xl sm:text-2xl text-pink-200 mb-12 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.9,
                      duration: 1,
                    },
                  }}
                >
                  The ultimate{" "}
                  <span className="text-pink-400 font-semibold">
                    Minecraft survival experience
                  </span>{" "}
                  with economy, PvP, and an amazing community!
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 1.1 } }}
                >
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(236, 72, 153, 0.7)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-8 py-4 rounded-xl text-lg font-semibold relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <FaServer className="inline mr-3 text-xl" /> Join Server
                      Now
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0"
                      animate={{
                        opacity: [0, 0.3, 0],
                        left: ["-10%", "110%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 rounded-xl text-lg font-semibold"
                  >
                    <FaDiscord className="inline mr-3 text-xl" /> Discord
                  </motion.button>
                </motion.div>

                {/* Premium Server IP Section */}
                <ServerIPSection />
              </div>

              {/* Floating decorative elements */}
              <FloatingDecorations />
            </section>

            {/* Premium Server Stats Section */}
            <motion.section
              className="py-16 bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-y border-pink-800/30 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-pink-600/10 blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl"></div>

              <div className="container mx-auto px-6 relative">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-center mb-12 text-pink-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Why Players <span className="text-pink-400">Love</span> Our
                  Server
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {serverStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-black/40 rounded-xl p-6 text-center border border-pink-800/30 hover:border-pink-500/50 transition-all duration-300 group relative overflow-hidden"
                      whileHover={{ y: -5, scale: 1.03 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <h3 className="text-4xl font-bold text-pink-100 mb-2">
                        {stat.value}
                      </h3>
                      <p className="text-pink-300 text-lg font-medium mb-2">
                        {stat.label}
                      </p>
                      <p className="text-pink-400/80 text-sm">
                        {stat.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Premium Features Section */}
            <section className="py-20 px-6 bg-gradient-to-b from-pink-900/20 to-black/50 relative overflow-hidden">
              {/* Decorative floating elements */}
              <motion.div
                className="absolute top-20 left-10 text-6xl text-pink-400/10"
                animate={{
                  y: [0, 30, 0],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <GiChest />
              </motion.div>

              <motion.div
                className="absolute bottom-20 right-10 text-7xl text-purple-400/10"
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, -360, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 2,
                }}
              >
                <GiSwordman />
              </motion.div>

              <div className="container mx-auto relative">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-center mb-16 text-pink-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Amazing <span className="text-purple-400">Features</span>
                </motion.h2>

                <div className="relative h-[500px] rounded-2xl overflow-hidden">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className={`absolute inset-0 ${
                        feature.bgImage
                      } bg-cover bg-center rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center ${
                        activeFeature === index ? "opacity-100" : "opacity-0"
                      }`}
                      animate={{ opacity: activeFeature === index ? 1 : 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="absolute inset-0 bg-black/50"></div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-b ${feature.color}`}
                      ></div>

                      <div className="relative z-10 p-8 max-w-2xl">
                        <motion.div
                          className="mb-6 inline-block"
                          animate={{
                            y: activeFeature === index ? 0 : 20,
                            opacity: activeFeature === index ? 1 : 0,
                          }}
                          transition={{ delay: 0.3 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <motion.h3
                          className="text-3xl md:text-4xl font-bold text-white mb-4"
                          animate={{
                            y: activeFeature === index ? 0 : 20,
                            opacity: activeFeature === index ? 1 : 0,
                          }}
                          transition={{ delay: 0.4 }}
                        >
                          {feature.title}
                        </motion.h3>
                        <motion.p
                          className="text-pink-200 text-lg md:text-xl mb-8"
                          animate={{
                            y: activeFeature === index ? 0 : 20,
                            opacity: activeFeature === index ? 1 : 0,
                          }}
                          transition={{ delay: 0.5 }}
                        >
                          {feature.description}
                        </motion.p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-lg font-medium transition-all"
                          animate={{
                            y: activeFeature === index ? 0 : 20,
                            opacity: activeFeature === index ? 1 : 0,
                          }}
                          transition={{ delay: 0.6 }}
                        >
                          Learn More
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveFeature(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          activeFeature === index
                            ? "bg-pink-400 w-6"
                            : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Premium Main Content Grid */}
            <div className="container mx-auto px-4 sm:px-6 mt-20 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              {/* Floating decorative elements */}
              <div className="absolute -left-20 top-1/4 w-40 h-40 rounded-full bg-pink-600/10 blur-3xl"></div>
              <div className="absolute -right-20 bottom-1/4 w-60 h-60 rounded-full bg-purple-600/10 blur-3xl"></div>

              {/* Left Column - Online Staff */}
              <motion.section
                className="bg-pink-900/40 rounded-2xl p-6 border border-pink-800/50 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-pink-100 flex items-center">
                  <FaUsers className="inline mr-3 text-pink-400" /> Online Staff
                </h2>
                <div className="space-y-4">
                  {staffMembers.map((staff, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center bg-pink-800/30 p-4 rounded-xl border-l-4 ${
                        staff.online ? "border-green-500" : "border-gray-500"
                      } hover:bg-pink-800/50 transition-colors`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="relative w-12 h-12 bg-pink-900/50 rounded-full mr-4 flex-shrink-0 overflow-hidden border border-pink-700/30">
                        {staff.avatar ? (
                          <Image
                            src={staff.avatar}
                            alt={staff.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        ) : (
                          <FaUser
                            className={`w-full h-full p-3 ${
                              staff.online ? "text-pink-300" : "text-gray-400"
                            }`}
                          />
                        )}
                        {staff.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-pink-900"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg truncate">
                          {staff.name}
                        </h3>
                        <p className="text-pink-300 text-sm">{staff.role}</p>
                        <div className="flex mt-1 text-xs text-pink-400/80 gap-2">
                          <span>Since {staff.since}</span>
                          <span>•</span>
                          <span className="truncate">{staff.specialty}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Middle Column - Store & News */}
              <div className="space-y-8">
                <motion.section
                  className="bg-pink-900/40 rounded-2xl p-6 border border-pink-800/50 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-pink-100 flex items-center">
                    <FaShoppingCart className="inline mr-3 text-yellow-400" />{" "}
                    Server Store
                  </h2>
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 15px rgba(234, 179, 8, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 px-5 py-4 rounded-xl font-medium mb-6 flex items-center justify-center"
                  >
                    <FaGift className="inline mr-3 text-xl" /> Shop Now & Get
                    Rewards!
                  </motion.button>
                  <div className="bg-pink-800/30 rounded-xl p-5 border border-pink-700/30">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-pink-200">
                        Latest News
                      </h3>
                      <span className="text-xs bg-pink-900/50 text-pink-300 px-2 py-1 rounded">
                        Updated Today
                      </span>
                    </div>
                    <div className="bg-pink-900/20 rounded-lg p-4 mb-4 border border-pink-800/50">
                      <h4 className="font-bold text-pink-100 mb-1">
                        Winter Event 2023
                      </h4>
                      <p className="text-pink-300 text-sm mb-2">
                        Join our special winter event with exclusive rewards and
                        snow-themed minigames!
                      </p>
                      <span className="text-xs text-pink-400">2 hours ago</span>
                    </div>
                    <button className="text-pink-300 hover:text-white text-sm font-medium flex items-center">
                      View all news <FaChevronDown className="inline ml-2" />
                    </button>
                  </div>
                </motion.section>

                <motion.section
                  className="bg-pink-900/40 rounded-2xl p-6 border border-pink-800/50 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-pink-100 flex items-center">
                    <FaTrophy className="inline mr-3 text-purple-400" /> Current
                    Events
                  </h2>
                  <div className="bg-pink-800/30 rounded-xl p-5 border border-pink-700/30">
                    <div className="flex items-start mb-4">
                      <div className="bg-purple-600/20 p-3 rounded-lg mr-4">
                        <GiSwordsEmblem className="text-2xl text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-pink-200 mb-1">
                          PvP Tournament
                        </h3>
                        <p className="text-pink-300 text-sm mb-3">
                          Weekly championship with amazing prizes! Top 3 players
                          get special ranks.
                        </p>
                        <div className="flex items-center text-xs text-pink-400 mb-3">
                          <span className="bg-pink-900/50 px-2 py-1 rounded mr-2">
                            Ongoing
                          </span>
                          <span>Ends in 2 days</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-3 rounded-lg font-medium flex items-center justify-center">
                      Sign Up Now
                    </button>
                  </div>
                </motion.section>
              </div>

              {/* Right Column - Players & Discord */}
              <div className="space-y-8">
                <motion.section
                  className="bg-pink-900/40 rounded-2xl p-6 border border-pink-800/50 backdrop-blur-sm"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-pink-100">
                      Recent Players
                    </h2>
                    <span className="text-xs bg-pink-900/50 text-pink-300 px-2 py-1 rounded">
                      42 Online
                    </span>
                  </div>
                  <div className="space-y-4">
                    {recentPlayers.map((player, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center bg-pink-800/30 p-3 rounded-xl hover:bg-pink-800/50 transition-colors"
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="relative w-10 h-10 bg-pink-900/50 rounded-full mr-3 flex items-center justify-center">
                          <FaUser
                            className={
                              player.online ? "text-pink-300" : "text-gray-400"
                            }
                          />
                          {player.online && (
                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-pink-900"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-bold truncate">
                              {player.name}
                            </h3>
                            <span className="text-xs text-pink-400/80 ml-2">
                              {player.playtime}
                            </span>
                          </div>
                          <div className="flex justify-between items-baseline">
                            <p className="text-pink-300 text-sm truncate">
                              {player.status}
                            </p>
                            <span className="text-xs bg-pink-900/50 text-pink-300 px-1.5 py-0.5 rounded">
                              {player.rank}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                <motion.section
                  className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-2xl p-6 border border-blue-800/50 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-blue-100 flex items-center">
                    <FaDiscord className="inline mr-3 text-indigo-400" /> Join
                    Our Discord
                  </h2>
                  <p className="text-blue-200 mb-6">
                    Connect with our community for updates, events, support, and
                    exclusive giveaways!
                  </p>
                  <div className="bg-blue-800/30 rounded-xl p-4 mb-6 border border-blue-700/30">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-900/50 rounded-full mr-3 flex items-center justify-center">
                        <FaUser className="text-blue-300" />
                      </div>
                      <div>
                        <h3 className="text-blue-100 font-medium">
                          200+ Members
                        </h3>
                        <p className="text-blue-300 text-xs">
                          Active community
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-900/50 rounded-full mr-3 flex items-center justify-center">
                        <FaTrophy className="text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="text-blue-100 font-medium">
                          Exclusive Roles
                        </h3>
                        <p className="text-blue-300 text-xs">Special perks</p>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-5 py-4 rounded-xl font-semibold flex items-center justify-center"
                  >
                    <FaDiscord className="inline mr-3 text-xl" /> Join Now
                  </motion.button>
                </motion.section>
              </div>

              {/* Premium Rules Section */}
              <motion.section
                className="lg:col-span-3 bg-pink-900/40 rounded-2xl p-6 border border-pink-800/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-2xl font-bold text-pink-100 flex items-center mb-4 sm:mb-0">
                    <FaBook className="inline mr-3 text-purple-400" /> Server
                    Rules
                  </h2>
                  <button
                    onClick={() => setShowRules(!showRules)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      showRules
                        ? "bg-pink-700 text-white"
                        : "bg-pink-900/50 text-pink-300 hover:bg-pink-800/50"
                    }`}
                  >
                    {showRules ? "Hide Rules" : "Show Rules"}
                  </button>
                </div>

                <AnimatePresence>
                  {showRules && (
                    <motion.div
                      className="bg-pink-800/30 rounded-xl border border-pink-700/30 overflow-hidden"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6">
                        <div className="mb-6">
                          <p className="text-pink-300 mb-4">
                            By joining our server, you agree to follow these
                            rules. Violations may result in warnings, temporary
                            bans, or permanent bans depending on severity.
                          </p>
                          <div className="bg-pink-900/50 text-pink-200 p-4 rounded-lg border border-pink-800/50">
                            <p className="font-medium mb-2">⚠️ Important:</p>
                            <p className="text-sm">
                              Ignorance of the rules is not an excuse. Staff
                              decisions are final in rule interpretations.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {Object.entries(rulesCategories).map(
                            ([category, rules]) => (
                              <motion.div
                                key={category}
                                className="bg-pink-900/20 rounded-lg p-5 border border-pink-800/50"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                viewport={{ once: true }}
                              >
                                <h3 className="text-lg font-semibold text-pink-300 mb-4 pb-2 border-b border-pink-800/50 flex items-center">
                                  <span className="mr-2 text-pink-400">
                                    {rules[0].icon}
                                  </span>
                                  {category}
                                </h3>
                                <ul className="space-y-3">
                                  {rules.map((rule, index) => (
                                    <motion.li
                                      key={index}
                                      className="text-pink-200 text-sm flex items-start"
                                      initial={{ opacity: 0, x: -5 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.1 + index * 0.05 }}
                                      viewport={{ once: true }}
                                    >
                                      <span className="text-pink-400 mr-2 mt-0.5">
                                        {rule.icon}
                                      </span>
                                      {rule.text}
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            )
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            </div>

            {/* Premium Footer with Black Gradient */}
            <footer className="py-12 px-6 bg-gradient-to-b from-black/90 to-black border-t border-pink-800/50 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-[url('/footer-pattern.png')] opacity-5"></div>
              <div className="absolute -top-20 left-1/2 w-60 h-60 rounded-full bg-pink-600/10 blur-3xl"></div>

              <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-pink-100 mb-4">
                      SeasonMC
                    </h3>
                    <p className="text-pink-300 text-sm mb-4">
                      The ultimate Minecraft survival experience since 2020.
                    </p>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="text-pink-400 hover:text-white text-xl"
                      >
                        <FaDiscord />
                      </a>
                      <a
                        href="#"
                        className="text-pink-400 hover:text-white text-xl"
                      >
                        <FaGlobe />
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-pink-100 mb-4">
                      Quick Links
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#"
                          className="text-pink-300 hover:text-white text-sm"
                        >
                          Home
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-pink-300 hover:text-white text-sm"
                        >
                          Vote
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-pink-300 hover:text-white text-sm"
                        >
                          Store
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-pink-300 hover:text-white text-sm"
                        >
                          Leaderboards
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-pink-100 mb-4">
                      Information
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#"
                          className="text-pink-300 hover:text-white text-sm"
                        >
                          Rules
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-pink-300 hover:text-white text-sm"
                        >
                          Staff
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-pink-300 hover:text-white text-sm"
                        >
                          FAQ
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-pink-300 hover:text-white text-sm"
                        >
                          Support
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-pink-100 mb-4">
                      Legal
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#"
                          className="text-pink-300 hover:text-white text-sm"
                        >
                          Terms
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-pink-300 hover:text-white text-sm"
                        >
                          Privacy
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-pink-300 hover:text-white text-sm"
                        >
                          Refunds
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-pink-300 hover:text-white text-sm"
                        >
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t border-pink-800/50 text-center">
                  <div className="flex justify-center gap-6 mb-4">
                    <a
                      href="#"
                      className="text-pink-400 hover:text-white text-sm font-medium"
                    >
                      Terms
                    </a>
                    <a
                      href="#"
                      className="text-pink-400 hover:text-white text-sm font-medium"
                    >
                      Privacy
                    </a>
                    <a
                      href="#"
                      className="text-pink-400 hover:text-white text-sm font-medium"
                    >
                      Support
                    </a>
                  </div>
                  <p className="text-pink-500 text-xs">
                    &copy; {new Date().getFullYear()} SeasonMC. Not affiliated
                    with Mojang or Microsoft.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </motion.div>
      )}
    </>
  );
}
