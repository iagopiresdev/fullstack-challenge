import React from "react";
import Dropdown from "./../dropdown";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from 'zod';
import { Link } from "react-router-dom";
import aichan from "../../assets/aichan.svg";
import jinwoo from "../../assets/jinwoo.svg";
import { SiMyanimelist } from "react-icons/si";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {
  IoMdNotificationsOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";


const Navbar = (props: {
  brandText: string;
  secondary?: boolean | string;
}) => {
  const { brandText } = props;
  const [darkmode, setDarkmode] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const searchSchema = z.string().min(1, 'Please enter at least 1 character');
  
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const result = searchSchema.safeParse(searchValue);

      if (!result.success) {
        alert(result.error.message);
      } else {
        navigate(`/manga-details/${searchValue}`);
      }
    }
  }


  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-light-primary dark:bg-dark-primary px-6 backdrop-blur-xl">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-light-text-accent hover:underline dark:text-dark-text"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-light-text-accent hover:text-light-text dark:text-dark-text">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-light-text-accent hover:underline dark:text-dark-text"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-light-text-accent dark:text-dark-text">
          <Link
            to="#"
            className="font-bold capitalize hover:underline"
          >
            Meu Perfil
          </Link>
        </p>
      </div>



      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-light-secondary px-2 py-2 shadow-sm shadow-shadow-500 dark:bg-dark-primary md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2 shadow-[#5800FF]">
        
        
        {/* Search */}
        <div className="flex h-full items-center rounded-full bg-light-primary text-light-text dark:bg-dark-primary dark:text-dark-text xl:w-[225px]">
      <p className="pl-3 pr-2 text-xl">
        <FiSearch className="h-4 w-4 text-light-text-accent dark:text-dark-text" />
      </p>
      <input
        type="text"
        placeholder="Acervo..."
        className="block h-full w-full rounded-full bg-light-primary text-sm font-medium text-light-text-accent outline-none placeholder:!text-light-text-accent dark:bg-dark-primary dark:text-dark-text dark:placeholder:!text-dark-text sm:w-fit"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onKeyPress={handleSearch}
      />
    </div>


        {/* start Notification */}
<Dropdown
  button={
    <p className="cursor-pointer">
      <IoMdNotificationsOutline className="h-4 w-4 text-dark-text-accent dark:text-dark-text" />
    </p>
  }
  animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
  children={
    <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-light-primary p-4 shadow-xl shadow-shadow-500 dark:bg-dark-primary dark:text-dark-text sm:w-[460px]">
      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-light-text dark:text-dark-text-accent">
          Notification
        </p>
        <p className="text-sm font-bold text-light-text dark:text-dark-text-accent">
          Mark all read
        </p>
      </div>


      {/* Notifications */}
      <button className="flex w-full items-center ">
        <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-dark-text-accent ">
          <SiMyanimelist />
        </div>
        <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
          <p className="mb-1 text-left text-base font-bold text-dark-text-accent dark:text-dark-text">
            Novo manga disponível!
          </p>
          <p className="font-base text-left text-xs text-light-text dark:text-dark-text">
            Um protagonista morreu e reencarnou com super poderes, que original!
          </p>
        </div>
      </button>

      <button className="flex w-full items-center">
        <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-dark-text-accent">
          <SiMyanimelist />
        </div>
        <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
          <p className="mb-1 text-left text-base font-bold text-dark-text-accent dark:text-dark-text">
            Novo resumo semanal
          </p>
          <p className="font-base text-left text-xs text-light-text dark:text-dark-text">
            Mais um capítulo de One Piece, e o Luffy ainda não é o Rei dos Piratas
          </p>
        </div>
      </button>
    </div>
  }
  classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
/>

        {/* Info */}
        <Dropdown
          button={
            <p className="cursor-pointer">
              <IoMdInformationCircleOutline className="h-4 w-4 text-dark-text-accent dark:text-dark-text" />
            </p>
          }
          children={
            <div className="flex w-[350px] flex-col gap-2 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-[#5800ff] dark:text-white dark:shadow-none">
              <div
                style={{
                  backgroundImage: `url(${aichan})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                className="mb-2 aspect-video w-full rounded-lg"
              />
              <a
                target="blank"
                href="https://horizon-ui.com/pro?ref=live-free-tailwind-react"
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl bg-brand-500 py-[11px] font-bold text-dark-text-accent transition duration-200 hover:bg-brand-600 hover:underline active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
              >
                Créditos
              </a>
              <a
                target="blank"
                href="https://horizon-ui.com/docs-tailwind/docs/react/installation?ref=live-free-tailwind-react"
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] text-dark-text-accent font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700 dark:!border-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/10"
              >
                Placeholder
              </a>
              <a
                target="blank"
                href="https://horizon-ui.com/?ref=live-free-tailwind-react"
                className="hover:bg-black px-full linear flex cursor-pointer items-center justify-center rounded-xl text-dark-text-accent py-[11px] font-bold text-navy-700 transition duration-200 hover:text-navy-700 dark:text-white dark:hover:text-white"
              >
                Placeholder
              </a>
            </div>
          }
          classNames={"py-2 top-6 -left-[250px] md:-left-[330px] w-max"}
          animation="origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
        />

        {/* light/dark mode toggle */}
        <div
          className="cursor-pointer text-dark-text-accent"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-dark-text-accent dark:text-dark-text" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-dark-text-accent dark:text-dark-text" />
          )}
        </div>

{/* Profile & Dropdown */}
<Dropdown
  button={
    <img
      className="h-10 w-10 rounded-full"
      src={jinwoo}
      alt="Jin woo from Solo Leveling and the best character ever"
    />
  }
  children={
    <div className="flex h-32 w-56 flex-col justify-start rounded-[20px] bg-light-primary bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:bg-dark-primary">
      <div className="mt-3 ml-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-light-text dark:text-dark-text">
            👋 Opa Opa!
          </p>{" "}
        </div>
      </div>
      <div className="mt-3 h-px w-full bg-light-secondary dark:bg-dark-secondary " />

      <div className="mt-3 ml-4 flex flex-col">
        <a
          href=" "
          className="text-sm text-light-text dark:text-dark-text hover:text-light-text-accent dark:hover:text-dark-text-accent"
        >
          Configurações
        </a>

        <a
          href=" "
          className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
        >
          Sair
        </a>
      </div>
    </div>
  }
  classNames={"py-2 top-8 -left-[180px] w-max"}
/>

      </div>
    </nav>
  );
};

export default Navbar;
