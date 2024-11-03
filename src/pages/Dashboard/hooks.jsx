import { useState } from "react";
import { Category } from "../Details/constants";

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
      basePath: "/private/details/",
      options: [
        {
          allPath: `all?category=${Category.Glass}`,
          addPath: `add?category=${Category.Glass}`,
          label: "Стъкла",
        },
        {
          allPath: `all?category=${Category.Metal}`,
          addPath: `add?category=${Category.Metal}`,
          label: "Метали",
        },
        {
          allPath: `all?category=${Category.Fastener}`,
          addPath: `add?category=${Category.Fastener}`,
          label: "Крепежи",
        },
        {
          allPath: `all?category=${Category.WireTerminalConnector}`,
          addPath: `add?category=${Category.WireTerminalConnector}`,
          label: "Проводници, клеми, накрайници",
        },
        {
          allPath: `all?category=${Category.AtraDetail}`,
          addPath: `add?category=${Category.AtraDetail}`,
          label: "АТРА",
        },
        {
          allPath: `all?category=${Category.LakiDetail}`,
          addPath: `add?category=${Category.LakiDetail}`,
          label: "ЛАКИ",
        },
        {
          allPath: `all?category=${Category.Other}`,
          addPath: `add?category=${Category.Other}`,
          label: "Други",
        },
      ],
    },
    components: {
      title: "Компоненти",
      basePath: "/private/components/",
      options: [{ allPath: "all", addPath: "add", label: "Всички" }],
    },
    products: {
      title: "Крайни изделия",
      basePath: "/private/products/",
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
