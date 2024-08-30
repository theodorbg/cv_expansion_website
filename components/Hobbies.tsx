"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

export default function HobbyTiles() {
  const Printing = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          3D-Printing
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          I have been 3D printing for over 5 years now, making everything from small trinkets to large scale projects. I currently own a Bambu lab P1S, and primarily design my own models in SolidWorks.
        </p>
      </div>
    );
  };

  const VideoGames = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Video games
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          I have played vairous video games for over 18 years now, and have played all genres across all platforms. I dont have as much time for games as i used to, but play a little FPS when on my PC when i can.
        </p>
      </div>
    );
  };

  const BoardGames = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Board games
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          As electronics are becomming more and more prevalent in our lives, I find that it is nice from time to tome to sit down with friends and play a board game. I only have a small collection of games, but am looking to add more.
        </p>
      </div>
    );
  };

  const DiscGolf = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Disc golf
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          Some friends recently introduced me to disc golf, and though I still find the sport a bit odd, I find myself playing more and more. I have a small collection of discs, and usually go to the course at least once per week.
        </p>
      </div>
    );
  };

  const Music = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Music
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          I first picked up the guitar in the last years of primary school, and have been playing ever since. I have since then also picked up piano and ukulele, and though i am not super skilled, I enjoy playing and singing for myself.
        </p>
      </div>
    );
  };

  const Exercise = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Exercise
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          Being honest, i am not a huge fan of exercise, but find it important for my health to be in a reasonable shape. I usually go to the gym at least once a week, complimented by daily walks or runs.
        </p>
      </div>
    );
  };

  const Food = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Food
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          Unfortunatly for my health, I have been a foodie all my life. I find great joy in a good meal, and like to put in the effort when i have the time. I am by no means a michelin chef, but I like to think that I can make a decent meal.
        </p>
      </div>
    );
  };

  const Reading = () => {
    return (
      <div>
        <p className="font-bold md:text-4xl text-xl text-white">
          Reading
        </p>
        <p className="font-normal text-base text-white"></p>
        <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
          I am have always enjoyed fantasy as a genre in both games, books and movies. I do, however, think that the absolute best way to emerge yourself in these magical worlds is through a good book. 
          Some of my favorites are the Mistborn and Stormlight Archive series by Brandon Sanderson.
        </p>
      </div>
    );
  };

  const cards = [
    {
      id: 1,
      headline: "3D-Printing",
      content: <Printing />,
      className: "md:col-span-2",
      thumbnail:
        "https://cyetesiooa.cloudimg.io/https://www.fespa.com/getattachment/7280cea0-9f30-471c-9a8d-7590aca555ac/3DPrintingOpportunities.png?width=750",
    },
    {
      id: 2,
      headline: "Video games",
      content: <VideoGames />,
      className: "col-span-2",
      thumbnail:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/capsule_616x353.jpg?t=1719426374",
    },
    {
      id: 3,
      headline: "Board games",
      content: <BoardGames />,
      className: "col-span-2",
      thumbnail:
        "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2020_25/3390425/board-games-kr-2x1-tease-200616.jpg",
    },
    {
      id: 4,
      headline: "Disc golf",
      content: <DiscGolf />,
      className: "md:col-span-3",
      thumbnail:
        "https://udisc-parse.s3.amazonaws.com/2ef9b6b3f34c9c61c436f993385e44bb_m_d9vycge28KiQfss1wtJJ3sXUwaWZ.jpg",
    },
    {
      id: 5,
      headline: "Music",
      content: <Music />,
      className: "md:col-span-3",
      thumbnail:
        "https://www.native-instruments.com/typo3temp/pics/img-welcome-hero-session-guitarist-acoustic-sunburst-hero-8962c37bdf97270091c31b8c1bb265fd-t@2x.jpg",
    },
    {
      id: 6,
      headline: "Food",
      content: <Food />,
      className: "col-span-2",
      thumbnail:
        "https://www.englishclub.com/images/vocabulary/food/cooking/cooking.jpg",
    },
    {
      id: 7,
      headline: "Exercise",
      content: <Exercise />,
      className: "col-span-2",
      thumbnail:
        "https://www.mensjournal.com/.image/t_share/MTk2MTM2OTgxNjc1Nzc5NTg5/fullbodyprofilecoupleyoungtwofriendsstrongsportysportswoman.jpg",
    },
    {
      id: 8,
      headline: "Reading",
      content: <Reading />,
      className: "md:col-span-2",
      thumbnail:
        "https://i.redd.it/310xphgdets61.jpg",
    },
  ];
  return (
    <div className="h-full w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}


