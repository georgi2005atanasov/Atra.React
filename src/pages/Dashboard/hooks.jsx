import { useState } from "react";

export const useHandlers = () => {
  const [menuAnchors, setMenuAnchors] = useState({
    details: null,
    components: null,
    products: null,
  });

  const handleClickAway = () => {
    setMenuAnchors({
      details: null,
      components: null,
      products: null,
    });
  };

  const handleMenuClick = (event, menuKey) => {
    setMenuAnchors((prev) => {
      const newAnchors = { details: null, components: null, products: null };
      newAnchors[menuKey] = prev[menuKey] ? null : event.currentTarget;
      return newAnchors;
    });
  };

  const handleMenuClose = () => {
    setMenuAnchors({ details: null, components: null, products: null });
  };
  const menus = {
    details: {
      title: "Детайли",
      basePath: "/details/",
      options: [
        {
          allPath: "all?detailCategory=glass",
          addPath: "add?detailCategory=glass",
          label: "Стъкла",
        },
        {
          allPath: "all?detailCategory=metal",
          addPath: "add?detailCategory=metal",
          label: "Метали",
        },
        {
          allPath: "all?detailCategory=fastener",
          addPath: "add?detailCategory=fastener",
          label: "Крепежи",
        },
        {
          allPath: "all?detailCategory=conductors",
          addPath: "add?detailCategory=conductors",
          label: "Проводници, клеми, накрайници",
        },
        {
          allPath: "all?detailCategory=atra",
          addPath: "add?detailCategory=atra",
          label: "АТРА",
        },
        {
          allPath: "all?detailCategory=laki",
          addPath: "add?detailCategory=laki",
          label: "ЛАКИ",
        },
        {
          allPath: "all?detailCategory=others",
          addPath: "add?detailCategory=others",
          label: "Други",
        },
      ],
    },
    components: {
      title: "Компоненти",
      basePath: "/components/",
      options: [{ allPath: "all", addPath: "add", label: "Всички" }],
    },
    products: {
      title: "Крайни изделия",
      basePath: "/products/",
      options: [
        {
          allPath: "all?category=lighting",
          addPath: "add?category=lighting",
          label: "Осветителни тела",
        },
        {
          allPath: "all?category=led",
          addPath: "add?category=led",
          label: "Професионални LED осветителни тела",
        },
        {
          allPath: "all?category=electrical",
          addPath: "add?category=electrical",
          label: "Електроинсталационни материали",
        },
        {
          allPath: "all?category=explosion-proof",
          addPath: "add?category=explosion-proof",
          label: "Взривозащитени изделия",
        },
        {
          allPath: "all?category=disinfection",
          addPath: "add?category=disinfection",
          label: "Дезинфекционни системи",
        },
      ],
    },
  };

  return {
    menuAnchors,
    handleClickAway,
    handleMenuClick,
    handleMenuClose,
    menus,
  };
};
