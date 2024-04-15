'use client'
import Image from "next/image";
import { useState, useEffect } from "react";



export default function Home() {

  const [projects, setProjects] = useState([]);

  useEffect (() => {
    const fetchData = async () => {
      const response = await fetch('https://my-json-server.typicode.com/perpl777/jsonPosts/projects');
      const data = await response.json();
      setProjects(data);
    }

    fetchData();
  }, []);


  return (
    <div>
      <h1 className="text-2xl pb-24 text-center">Projects</h1>

      <div className="flex px-10 space-x-8 max-lg:px-5">
        {projects.map((project: any, ind) => {
          return (
            <div key={ind} className="relative min-h-96 w-full max-lg:min-h-64"> 

              <Image 
                src={project.image} 
                alt={project.title} 
                fill
                quality={75}
                className="object-cover rounded-2xl"
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 50vw" 
              />

              <div className="relative rounded-t-2xl bg-slate-100 p-3 -pt-10">
                <p className="text-black text-xl font-bold text-center">
                  {project.title}
                </p>
              </div>
            </div>
        )
        }) 
        }
      </div>
    </div>
  );
};
