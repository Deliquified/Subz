import fabs from '../../../public/fabs.jpg';
import chill from '../../../public/chill.jpg';
import fish from '../../../public/fish.gif';

export interface Token {
    address: string;
    name: string;
    icon: string;
  }
  
  export const SUPPORTED_TOKENS: Token[] = [
    {
      address: "0x650e14f636295af421d9bb788636356aa7f5924c",
      name: "Fabs",
      icon: fabs.src
    },
    {
      address: "0x5b8b0e44d4719f8a328470dccd3746bfc73d6b14",
      name: "Chill",
      icon: chill.src
    },
    {
      address: "0xf76253bddf123543716092e77fc08ba81d63ff38",
      name: "Fish",
      icon: fish.src
    }
  ];