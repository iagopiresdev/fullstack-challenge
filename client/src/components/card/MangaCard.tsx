import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Card from ".";

interface Manga {
  title: string;
  picture_url: string;
  description: string;
  myanimelist_url: string;
  myanimelist_id: number;
}

interface MangaCardProps {
  image: string;
  title: string;
  author: string;
  position: number;
  price: string | number;
  userId: string;
  mangaId: number;
}

const MangaCard: React.FC<MangaCardProps> = ({ userId, mangaId ,title, author, price, image, position }) => {
  const [heart, setHeart] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [mangaCompleto, setMangaCompleto] = useState<Manga | null>(null);
  const [alert, setAlert] = useState<string | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);


  const handleHeartClick = () => {
    setIsLoading(true);
    
    if(heart) {
      setHeart(false);
      setMangaUser();
    }
    else {
      setHeart(true);
      removeMangaUser();
    }
    setIsLoading(false);
  };

  const setMangaUser = async () => {
    setIsUserLoading(true);
    console.log(mangaId);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/userMangas/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mangaId: mangaId
        })
      });
      if (response.ok) {
        setAlert('Manga adicionado com sucesso!');
        console.log('Manga adicionado com sucesso!');
      }
    }catch (error) {
      setAlert('Falha ao criar ou deletar o manga. Por favor, tente novamente mais tarde.');
      console.error(error);
    } finally { 
      setIsUserLoading(false);
    }
  };

  const removeMangaUser = async () => {
    setIsUserLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/userMangas/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mangaId: mangaId 
        })
      });
      if (response.ok) {
        setAlert('Manga removido com sucesso!');
        console.log('Manga removido com sucesso!');
      }
    }catch (error) {
      setAlert('Falha ao criar ou deletar o manga. Por favor, tente novamente mais tarde.');
      console.error(error);
    } finally {
      setIsUserLoading(false);
    }
  };

  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white`}
    >

  {alert && <p className="bg-red-500 rounded-xl text-white p-4">{alert}</p>}
      <div className="h-full w-full">
        <div className="relative w-full rounded-xl">
          <img
            src={image}
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
          <button
            onClick={handleHeartClick}
            className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50 dark:text-navy-900">
              {heart ? (
                <IoHeartOutline />
              ) : (
                <IoHeart className="text-brand-500" />
              )}
            </div>
          </button>
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {title}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              By {author}{" "}
            </p>
          </div>

          <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
            <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 dark:text-white">
              +5
            </span>
            {/*bidders.map((avt, key) => (
              <span
                key={key}
                className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white dark:!border-navy-800"
              >
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={avt}
                  alt=""
                />
              </span>
            ))*/}
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="mb-2 text-sm font-bold text-brand-500 dark:text-white">
              Ranking: {price}
            </p>
          </div>
          <Card>
    </Card>
        </div>
      </div>
    </Card>
  );
};

export default MangaCard;
