import React, { useEffect, useMemo, useRef, useState } from "react";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
  import { Progress } from "@/components/ui/progress";
  import { Input } from "@/components/ui/input";
  import { Textarea } from "@/components/ui/textarea";
  import { toast } from "@/hooks/use-toast";
  import anime from "animejs";
  import { Mail, MapPin, Phone, Linkedin, Github, ArrowDownRight } from "lucide-react";
  // import { Canvas } from "@react-three/fiber";
  // import { OrbitControls } from "@react-three/drei";
  // import WavingRobot from "../components/"; // adjust the path to where you saved WavingRobot.tsx
  // import { ModelViewerElement } from "@google/model-viewer";
 




  const Index = () => {
    // Smooth reveal for hero and staggered nav
    useEffect(() => {
      const tl = anime.timeline({ easing: "easeOutQuad" });
      tl.add({ targets: ".hero-title", translateY: [16, 0], opacity: [0, 1], duration: 700 })
        .add({ targets: ".hero-subtitle", translateY: [12, 0], opacity: [0, 1], duration: 600 }, "-=300")
        .add({ targets: ".hero-ctas > *", opacity: [0, 1], translateY: [8, 0], delay: anime.stagger(80), duration: 400 }, "-=200");

      // Floating shapes
      anime({ targets: ".float-shape-1", translateY: [0, 12], direction: "alternate", easing: "easeInOutSine", duration: 3000, loop: true });
      anime({ targets: ".float-shape-2", translateY: [0, -14], rotate: [0, 8], direction: "alternate", easing: "easeInOutSine", duration: 3500, loop: true });
    }, []);

    // Intersection-based section reveals
    useEffect(() => {
      const nodes = document.querySelectorAll<HTMLElement>("[data-animate]");
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animate-enter");
            e.target.classList.remove("opacity-0");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.2 });
      nodes.forEach((n) => io.observe(n));
      return () => io.disconnect();
    }, []);

    // Projects
    const projects = useMemo(() => ([
      {
        title: "MARS Rover — Alaknanda (Iteration 3)",
        desc: "Third-gen rover platform focusing on terrain traversal, modular suspension, and sensor integration.",
        details: [
          "Robotic Arm Development: Achieved a 27% reduction in arm weight (from 15 kg to under 11 kg) by replacing aluminium links with carbon fiber pipes and using 3D-printed bevel gears; replaced base coupler with an in-house 3D-printed worm gearbox to multiply torque and eliminate backdrivability.",
          "Project Contribution and Challenges: Contributed to executing rover tasks — IDMO, RDO, ABeX, and AutEX — by applying technical expertise and teamwork to develop a robust, high-performing system.",
          "Collaboration and Mentorship: Collaborated with a 32-member multidisciplinary team to secure runner-up at IRC 2025, gaining hands-on robotics experience and strengthening cross-functional collaboration under expert mentorship."
        ],
        path: "models/Alaknanda_Arm.glb",
        style:"ml-5 mb-7 flex flex-wrap gap-2",
        data: [" SolidWorks", "ANSYS", "Ultimaker Cura"]
      },
      {
        title: "7-DOF Industrial Robotic Arm",
        desc: "High-precision arm with inverse kinematics, payload optimization, and safety interlocks.",
        details: [
          "Led the design and mechanical optimization of a 7-DOF robotic arm, ensuring kinematic efficiency and suitability for palletization tasks using inverse kinematics.",
          "Supervised and executed the 3D printing of 20+ ABS parts on an Ender 3, maintaining precision and durability through overnight production to meet industrial-grade standards."
        ],
        path: "models/7_dof.glb",
        style:"ml-5 mb-7 flex flex-wrap gap-2",
        data: ["SolidWorks", "Ender-3", "Ultimaker Cura"]
      },
      {
        title: "MARS Rover — Bhagirathi (Iteration 2)",
        desc: "Improved drivetrain and control system with robust chassis and field-ready prototyping.",
        details: [
          "Robotic Arm Development: Designed and developed version II of the IRC 2024 rover with a 5-DOF linear-actuated aluminum 6062 robotic arm (7 kg payload), integrating a bevel gear differential for pitch and roll, and expanding the work envelope by 30%.",
          "Rocker Bogie and AbeX Development: Enhanced rover mobility using PU balloon wheels and differential steering (20% camber reduction), achieving a 30% lighter rocker-bogie suspension and a 40% lighter 3D-printed soil collection and sampling system."
        ],
        path: "models/Bhagirathi.glb",
        style:"ml-5 mb-7 flex flex-wrap gap-2",
        data: ["SolidWorks", "ANSYS", "Ultimaker Cura"]
      },
      {
        title: "Entity Protector Vehicle (EPV)",
        desc: "Rapid-response vehicle concept for protection and escort with ruggedized mechanical design.",
        details: [
          "Designed and developed an innovative go-kart powered by a Bajaj Chetak engine, integrating advanced safety features including alcohol detection, flotation system, and real-time GPS tracking.",
          "Engineered for enhanced passenger safety and ride comfort, the project showcased a fusion of mechanical design and embedded systems for accident prevention."
        ],
        images: [
          "images/WhatsApp Image 2025-08-11 at 17.44.02_01893b0d.jpg",
          "images/WhatsApp Image 2025-08-11 at 17.44.02_6a2054b7.jpg",
          "images/WhatsApp Image 2025-08-11 at 17.44.03_1701bbad.jpg",
          "images/WhatsApp Image 2025-08-11 at 17.44.03_b1f46a21.jpg"
        ],
        style:"ml-5 mb-7 flex flex-wrap gap-2",
        data: ["Arduino IDE", "Manufacturing"]
      },
    ]), []);
    const ProjectViewer = ({ path, images }: { path?: string; images?: string[] }) => {
      const [index, setIndex] = useState(0);
      
      useEffect(() => {
        if (!images || images.length === 0) return;
        const interval = setInterval(() => {
          setIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
      }, [images]);

      if (images && images.length > 0) {
        return (
          <div className="relative mt-6 mb-6 w-3/5 h-[300px] overflow-hidden rounded-lg">
            <img
              src={images[index]}
              alt={`Project image ${index + 1}`}
              className="absolute w-full h-full object-cover transition-opacity duration-500"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        );
      }

      if (path) {
        return (
          <model-viewer
            src={path}
            alt="CAD model of the project"
            camera-controls
            auto-rotate
            style={{ width: '100%', height: '400px' }}
          ></model-viewer>
        );
      }

      return null;
    };

    // Experience
    const experience = useMemo(() => [
      {
        company: "Rockpecker Pvt. Ltd.",
        role: "Quality Control Engineer Intern",
        year: "2024",
        details: (
          <>
            <ul className="list-disc list-inside text-justify space-y-1">
              <li>
                Performed quality inspections on production pieces using precision instruments, including Trimos height gauge, interpreted production drawings to verify dimensional accuracy and compliance, and prepared detailed reports for final evaluation.
              </li>
              <li>
                Assisted in streamlining the production process by conducting in-line inspections of machined parts, identifying defects early (leading to modification in production), and collaborating with the production team to implement corrective actions, reducing overall defect rates.
              </li>
            </ul>
          </>
        ),
      },
      {
        company: "Vibracoustic India Pvt. Ltd.",
        role: "CAD Engineer Intern",
        year: "2023",
        details: (
          <>
            <ul className="list-disc list-inside text-justify space-y-1">
              <li>
                I acquired proficiency in NX, ANSYS and Hypermesh through guidance from experienced professionals during my internship.
              </li>
              <li>
                Prepared reports on the above information and reported the insights.
              </li>
            </ul>
          </>
        ),
      },
    ], []);


    // Skills
    const skills = useMemo(() => ([
      { key: "SolidWorks", value: 92 },
      { key: "NX", value: 85 },
      { key: "ANSYS", value: 80 },
      { key: "Mechanical Design", value: 90 },
      { key: "3D Printing", value: 88 },
      { key: "Embedded Systems", value: 70 },
    ]), []);
    type SkillKey = typeof skills[number]["key"];

    const [skillValues, setSkillValues] = useState<Record<SkillKey, number>>({
      SolidWorks: 0,
      NX: 0,
      ANSYS: 0,
      "Mechanical Design": 0,
      "3D Printing": 0,
      "Embedded Systems": 0,
    });
    const skillAnimObj = useRef<Record<string, number>>({ ...skillValues });

    useEffect(() => {
      const el = document.getElementById("skills-section");
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: skillAnimObj.current,
              ...skills.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as Record<string, number>),
              duration: 1200,
              easing: "easeOutCubic",
              update: () => {
                setSkillValues({
                  SolidWorks: Math.round(skillAnimObj.current["SolidWorks"] || 0),
                  NX: Math.round(skillAnimObj.current["NX"] || 0),
                  ANSYS: Math.round(skillAnimObj.current["ANSYS"] || 0),
                  "Mechanical Design": Math.round(skillAnimObj.current["Mechanical Design"] || 0),
                  "3D Printing": Math.round(skillAnimObj.current["3D Printing"] || 0),
                  "Embedded Systems": Math.round(skillAnimObj.current["Embedded Systems"] || 0),
                });
              },
            });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      obs.observe(el);
      return () => obs.disconnect();
    }, [skills]);

    // Contact form
    // inside your Index component (replace handleSubmit)
    const WEB_APP_URL =
      "https://script.google.com/macros/s/AKfycbysFE2i45GfmX-yYplbhMoLke9Y2Pb4UGwsDnGqdyeHOtDrTeohK_lfW1aSQIemwhv6/exec";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      // Keys must match what the GAS script expects
      const formData = new FormData();
      formData.append("name", name);     // lowercase
      formData.append("email", email);   // lowercase
      formData.append("message", message); // lowercase

      try {
        const response = await fetch(WEB_APP_URL, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (result.status === "success") {
          alert("Message sent and stored successfully!");
          setName("");
          setEmail("");
          setMessage("");
        } else {
          alert("Failed to send: " + result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

        

    // Project card hover lift
    const onCardEnter = (el: HTMLElement) => {
      anime({ targets: el, translateY: -6, duration: 250, easing: "easeOutQuad" });
    };
    const onCardLeave = (el: HTMLElement) => {
      anime({ targets: el, translateY: 0, duration: 250, easing: "easeOutQuad" });
    };

    return (
      <div className="min-h-screen font-sans">
        <header className="sticky top-0 z-40 border-b border-sidebar-border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container flex h-16 items-center justify-between">
            <a href="#top" className="text-lg font-semibold story-link">Ekam Singh</a>
            <div className="hidden gap-6 md:flex">
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground">About</a>
              <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground">Projects</a>
              <a href="#experience" className="text-sm text-muted-foreground hover:text-foreground">Experience</a>
              <a href="#skills" className="text-sm text-muted-foreground hover:text-foreground">Skills</a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
            </div>
            <div className="flex items-center gap-2">
              <a href="#contact"><Button variant="hero" size="sm" className="hover-scale">Let's talk</Button></a>
            </div>
          </nav>
        </header>

        <main id="top" className="container">
          {/* Hero */}
          <section aria-label="Hero" className="relative py-20 md:py-28">
    {/* Spline background */}
    <div className="absolute ml-[550px] inset-0 -z-10">
                  <spline-viewer
                    loading-anim-type="spinner-small-dark" 
                    url="https://prod.spline.design/19UELZ4mN2vEfJuL/scene.splinecode"
                    style={{ width: "100%", height: "55%" }}
                  ></spline-viewer>
                </div>

                {/* Floating SVGs */}
                <svg
                  className="float-shape-1 pointer-events-none absolute left-[5%] top-10 h-24 w-24 opacity-50"
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="hsl(var(--sidebar-ring))"
                    strokeOpacity="0.35"
                    strokeWidth="3"
                  />
                </svg>
                <svg
                  className="float-shape-2 pointer-events-none absolute right-[8%] top-24 h-20 w-20 opacity-50"
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="40"
                    y="40"
                    width="120"
                    height="120"
                    rx="18"
                    stroke="hsl(var(--sidebar-primary))"
                    strokeOpacity="0.35"
                    strokeWidth="3"
                  />
                </svg>

                <div className="relative z-10 mx-auto max-w-3xl text-center">
                  <h1 className="hero-title text-4xl font-extrabold tracking-tight md:text-6xl">
                    Ekam Singh
                  </h1>
                  <p className="hero-subtitle mt-4 text-lg text-muted-foreground md:text-xl">
                    Robotics Engineer
                  </p>
                  <p className="hero-subtitle mt-4 text-lg text-muted-foreground md:text-xl">
                    B.E. Mechatronics — robotics design, mechanical systems, and rapid
                    prototyping.
                  </p>
                  <div className="hero-ctas mt-8 flex flex-wrap items-center justify-center gap-3">
                    <a href="#contact">
                      <Button variant="hero" className="hover-scale">
                        <Mail className="mr-1" /> Email
                      </Button>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ekam-singh3/"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Button variant="outline" className="hover-scale">
                        <Linkedin className="mr-1" /> LinkedIn
                      </Button>
                    </a>
                    <a
                      href="https://github.com/Ekam-Singh3"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Button variant="outline" className="hover-scale">
                        <Github className="mr-1" /> GitHub
                      </Button>
                    </a>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> <span>Mohali, Punjab, India</span>
                  </div>
                </div>
              </section>


          {/* About */}
          <section id="about" className="scroll-mt-24 py-16 opacity-0" data-animate>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight">About</h2>
              <p className="mt-4 text-muted-foreground text-justify">
                Aspiring robotics engineer with practical experience in mechanical design, CAD modeling, and 3D printing through
                Mars rover projects and industry internships. Designed and developed a 5-DOF robotic arm and collaborated in
                cross-functional teams for international competitions. Proficient in SolidWorks, ANSYS, and NX. Currently learning
                the basics of electronics and control systems to build a well-rounded foundation in robotics.            </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Education</CardTitle>
                    <CardDescription>Thapar Institute of Engineering & Technology <br /> B.E. in Mechatronics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-justify">Focused on Robotics, CAD/CAM and Mechanical Design </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Interests</CardTitle>
                    <CardDescription>Robotics, mechanisms, prototyping</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-inside list-disc text-sm text-muted-foreground text-justify">
                      <li>Rover mobility & suspension</li>
                      <li>Robotic arms & kinematics</li>
                      <li>Simulation-driven design</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section
            id="projects"
            className="scroll-mt-24 py-16 opacity-0"
            data-animate
          >
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>

            <div className="mt-8 max-w-5xl mx-auto grid gap-6 md:grid-cols-1">
                {projects.map((p) => (
                  <Card
                    key={p.title}
                    onMouseEnter={(e) => onCardEnter(e.currentTarget)}
                    onMouseLeave={(e) => onCardLeave(e.currentTarget)}
                    className="transition-shadow hover:shadow-[var(--shadow-elevated)]"
                  >
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      
                      {/* Left side - Text */}
                      <div>
                        <CardHeader>
                          <CardTitle className="text-xl">{p.title}</CardTitle>
                          <CardDescription>{p.desc}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {p.details && Array.isArray(p.details) && (
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-2 text-justify">
                              {p.details.map((d, i) => (
                                <li key={i}>{d}</li>
                              ))}
                            </ul>
                          )}
                        </CardContent>
                      </div>

                      {/* Right side - 3D Model or Image Carousel */}
                      <div className="flex justify-center">
                        <ProjectViewer path={p.path} images={p.images} />
                      </div>

                    </div>
                    <div>
                      {/* <span className="font-semibold">Fields:</span> */}
                      <span className={p.style}>
                        {p.data.map((item) => (
                          <span key={item} className="rounded-md border border-sidebar-border bg-muted px-2 py-1 text-xs text-muted-foreground">{item}</span>
                        ))}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
          </section>


          {/* Experience */}
          <section id="experience" className="scroll-mt-24 py-16 opacity-0" data-animate>
            <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
            <div className="mt-6 space-y-4">
              {experience.map((e) => (
                <Card key={e.company} className="border-sidebar-border">
                  <CardHeader className="flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{e.company}</CardTitle>
                      <CardDescription>{e.role}</CardDescription>
                    </div>
                    <div className="text-sm text-muted-foreground">{e.year}</div>
                  </CardHeader>
                  <CardContent>
                    {e.details}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section id="skills" className="scroll-mt-24 py-16 opacity-0" data-animate>
            <h2 className="text-3xl font-bold tracking-tight mb-8">Skills Overview</h2>
            <div id="skills-section" className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fields</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Mechanical Engineering", "Mechanical Design", "3D Modeling", "Technical Drawings"].map((item) => (
                      <span key={item} className="rounded-md border border-sidebar-border bg-muted px-2 py-1 text-xs text-muted-foreground">{item}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["C (Basics)", "C++ (OOPs)"].map((item) => (
                      <span key={item} className="rounded-md border border-sidebar-border bg-muted px-2 py-1 text-xs text-muted-foreground">{item}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Design/Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["SolidWorks", "NX", "Creo", "HyperMesh", "ANSYS (Static)", "AutoCAD", "PrusaSlicer", "Cura", "Microsoft Excel"].map((item) => (
                      <span key={item} className="rounded-md border border-sidebar-border bg-muted px-2 py-1 text-xs text-muted-foreground">{item}</span>
                    ))}
                  </div>
                </CardContent>
              </Card> */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Simulation/Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["FEA (Static/Dynamic)", "CFD (ANSYS Fluent)", "Stress Analysis", "Topology Optimization", "Torque & Gear Ratio Calculations"].map((item) => (
                      <span key={item} className="rounded-md border border-sidebar-border bg-muted px-2 py-1 text-xs text-muted-foreground">{item}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Manufacturing/Prototyping</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Additive Manufacturing (FDM)", "DFM/DFA", "3D Printing Workflow", "CAM Basics", "Soldering"].map((item) => (
                      <span key={item} className="rounded-md border border-sidebar-border bg-muted px-2 py-1 text-xs text-muted-foreground">{item}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Embedded Systems</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Teensy", "Arduino", "STM32", "Sensor Integration", "Motor Control (PID, PWM)"].map((item) => (
                      <span key={item} className="rounded-md border border-sidebar-border bg-muted px-2 py-1 text-xs text-muted-foreground">{item}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Core Knowledge</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Robotics", "CAD/CAM", "GD&T"].map((item) => (
                      <span key={item} className="rounded-md border border-sidebar-border bg-muted px-2 py-1 text-xs text-muted-foreground">{item}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>  
              <div className="mt-10 grid gap-6 md:grid-cols-1">
                      <Card className="w-full">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold">Tools</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid lg:grid-cols-9  text-center ">
                          {[
                            { name: "SolidWorks", icon: "/icons/solidworks.svg" },
                            { name: "NX", icon: "/icons/nx.svg" },
                            { name: "Creo", icon: "/icons/creo.svg" },
                            { name: "HyperMesh", icon: "/icons/hypermesh.svg" },
                            { name: "ANSYS (Static)", icon: "/icons/ansys.svg" },
                            { name: "AutoCAD", icon: "/icons/autocad.svg" },
                            { name: "PrusaSlicer", icon: "/icons/prusaslicer.svg" },
                            { name: "Cura", icon: "/icons/cura.svg" },
                            { name: "Microsoft Excel", icon: "/icons/excel.svg" },
                          ].map((tool) => (
                            <div key={tool.name} className="flex flex-col items-center">
                              <div className="bg-gray-100 dark:bg-gray-200 p-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-200">
                                <img
                                  src={tool.icon}
                                  alt={tool.name}
                                  className="h-12 w-12 object-contain"
                                />
                              </div>
                              <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">{tool.name}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-1">
              {/* <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    { [
                      "SolidWorks", "NX", "ANSYS", "Cura", "Ender-3", "AutoCAD", "HyperMesh"
                    ].map((t) => (
                      <span key={t} className="rounded-md border border-sidebar-border px-2 py-1">{t}</span>
                    ))}
                  </div>
                </CardContent>
              </Card> */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc text-base text-muted-foreground space-y-1">
                    <li>
                      Certificate of Participation in Robotron Workshop organized by Tech Analogy.
                    </li>
                    <li>
                      Certificate of Participation in RoboAi Workshop organized by MyEquation.
                    </li>
                    <li>
                      Certificate of Organization for efforts in organizing the DST-SERB sponsored One Day.
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Publications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc text-base text-muted-foreground space-y-1">
                    {/* <li> */}
                      <span className="font-semibold">
                        7th International Conference of The Robotics Society (AIR 2025) | Accepted
                      </span>
                      <br />
                      <span className="italic">June 2025</span>
                      <br />
                      <span className="font-semibold">
                        Title: Design and Analysis of a Mars Rover with Rocker-Bogie Suspension carrying a 5-DOF Robotic Arm.
                      </span>
                      <br />
                      Contributed to research on 5-DOF Robotic Arm, Rocker-Bogie length calculations, and chassis stress calculation for a multi-subsystem Martian rover, presented at a leading robotics conference highlighting the research paper name and conference.
                      <br />
                      <span className="font-semibold">
                        Authors: Manish Jain, Ekam Singh, Shyam Sundar Mallampalli, Anant Tomar, Sachin Kansal, Ashish Singla
                      </span>
                      <br />
                    {/* </li> */}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Honours and Awards</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc text-base text-muted-foreground space-y-1">
                    <li>
                      2nd Overall Position in International Rover Challenge 2025 (IRC’25) held at BITS, Goa.
                    </li>
                    <li>
                      Winner of RoboWars, Saturnalia’24 held at Thapar University.
                    </li>
                    <li>
                      Finalist at International Rover Challenge 2024 (IRC’24) held at PSG iTech, Coimbatore.
                    </li>
                    <li>
                      Winner of RoboWars, Saturnalia’23 held at Thapar University.
                    </li>
                    <li>
                      Participated in National level CBSE Science Exhibition held at Suncity School, Gurugram.
                    </li>
                    <li>
                      Winner of State Level CBSE Science Exhibition held at GreenLand Sr. Sec. Public School, Ludhiana.
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-24 py-16 opacity-0" data-animate>
            <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground"><Mail className="h-4 w-4" /> ekamsingh11019@gmail.com</div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground"><Phone className="h-4 w-4" /> +91-8847619220</div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> Mohali, Punjab, India</div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Linkedin className="h-4 w-4" />
                  <a
                    href="https://www.linkedin.com/in/ekam-singh3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    www.linkedin.com/in/ekam-singh3
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Github className="h-4 w-4" />
                  <a
                    href="https://github.com/Ekam-Singh3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    https://github.com/Ekam-Singh3
                  </a>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Send a message</CardTitle>
                  <CardDescription>I'll get back to you shortly</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm">Name</label>
                    <Input
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Message</label>
                    <Textarea
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Hello, I'd like to discuss…"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" variant="hero" className="hover-scale">
                      <Mail className="mr-1" /> Send
                    </Button>
                    {/* <a href={`mailto:ekamsingh11019@gmail.com`}>
                      <Button variant="outline" className="hover-scale">Open Mail</Button>
                    </a> */}
                  </div>
                </form>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <footer className="border-t border-sidebar-border py-8">
          <div className="container text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ekam Singh — Built with React, Tailwind, and anime.js
          </div>
        </footer>
      </div>
    );
  };

  export default Index;
