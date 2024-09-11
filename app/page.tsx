"use client";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import TwoColumnLayout from "./components/twoColumns";
import { useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      console.log("Previous Mode:", prevMode); // Log previous state value
      const newMode = !prevMode; // Toggle the state
      console.log("New Mode:", newMode); // Log the new state value
      return newMode; // Return the new state value
    });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-black"
      }`}
    >
      <main className="px-10 font-poppins">
        <section className="min-h-screen">
          <nav className="py-10 mb-4 flex justify-between dark:text-white">
            <h1 className="text-xl font-poppins dark:text-gray-200">
              Subaktiar
            </h1>
            <ul className="flex items-center">
              <li>
                <BsFillMoonStarsFill
                  className="cursor-pointer text-2xl"
                  onClick={toggleDarkMode}
                />
              </li>
              <li>
                <Link
                  className="bg-gradient-to-r from-cyan-500 to-teal-500
                  px-4 py-2 rounded-md ml-8"
                  href="/resume"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </nav>
          <div className="text-center p-6">
            <h2 className="text-5xl py-2 text-teal-500 font-medium dark:text-teal-400 md:text-6xl">
              Dion Subaktiar
            </h2>
            <h3 className="text-2xl py-2 dark:text-gray-200">
              Developer and Software Engineer
            </h3>
            <p className="text-md py-5 leading-8 dark:text-gray-20k">
              I am a skilled developer with a Bachelor’s degree in Information
              Engineering from the University of 17 August 1945 Surabaya,
              graduating with a GPA of 3.40. I specialize in building efficient
              and scalable solutions using tools such as Laravel, Next.js, and
              MATLAB, combining my technical expertise with a strong foundation
              in software engineering.
            </p>
          </div>
          <div className="text-3xl flex justify-center gap-14 py-3 dark:text-gray-400">
            <AiFillInstagram />
            <AiFillGithub />
            <AiFillLinkedin />
          </div>
          <div className="mx-auto bg-gradient-to-b from-teal-500 to-cyan-300 rounded-full w-60 h-60 relative overflow-hidden mt-5 mb-16 md:h-96 md:w-96">
            <Image
              src="/assets/images/profile.png"
              fill
              style={{ objectFit: "contain" }}
              alt="profile"
            />
          </div>
        </section>
        <section>
          <TwoColumnLayout
            column1title="Career"
            column2title="Skills"
            column1content={
              <div>
                <p className="text-md py-2 leading-8 dark:text-gray-200">
                  Here is a list of my career highlights:
                </p>
                <ul className="list-disc ml-4">
                  <li>
                    <strong>Admin at CV. Nusantara Trans</strong> (February 2022
                    - May 2023)
                    <br />
                    Responsibilities included:
                    <ul className="list-disc ml-4">
                      <li>Creating invoices and financial documentation</li>
                      <li>Recording and managing spending and income</li>
                      <li>
                        Drafting official correspondence for partner companies
                      </li>
                      <li>
                        Coordinating administrative tasks and office management
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Freelance Full Stack Developer</strong> (June 2023 -
                    January 2024)
                    <br />
                    Key projects and technologies used:
                    <ul className="list-disc ml-4">
                      <li>Developed over 5 projects of web applications</li>
                      <li>
                        Used Laravel for backend development and HTML for
                        frontend
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>IT Specialist at PT Nusantara Trans Sentosa</strong>{" "}
                    (January 2024 - Present)
                    <br />
                    Current responsibilities include:
                    <ul className="list-disc ml-4">
                      <li>Managing IT infrastructure and support</li>
                      <li>Overseeing system maintenance and upgrades</li>
                      <li>
                        Providing technical support to staff and resolving
                        issues
                      </li>
                      <li>
                        Implementing security measures and data protection
                        protocols
                      </li>
                      <li>
                        Developed 3 major projects to enhance company operations
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            }
            column2content={
              <div>
                <p className="text-md py-2 leading-8 dark:text-gray-200">
                  My key skills include:
                </p>
                <ul className="list-disc ml-4">
                  <li>
                    <strong>Adaptive</strong> - Eager to embrace new challenges,
                    consistently learning and growing.
                  </li>
                  <li>
                    <strong>MS Excel</strong> - Advanced data analysis and
                    visualization
                  </li>
                  <li>
                    <strong>MS Word</strong> - Professional document creation
                    and formatting
                  </li>
                  <li>
                    <strong>Next.js</strong> - Building dynamic and
                    server-rendered React applications
                  </li>
                  <li>
                    <strong>Laravel</strong> - Developing robust and scalable
                    PHP applications
                  </li>
                  <li>
                    <strong>MATLAB</strong> - Image segmentation and
                    classification for medical images
                  </li>
                  <li>
                    <strong>Device Repair</strong> - Expertise in repairing
                    phones and laptops, including both software troubleshooting
                    and hardware component replacement
                  </li>
                </ul>
              </div>
            }
          />
        </section>
      </main>
    </div>
  );
}
