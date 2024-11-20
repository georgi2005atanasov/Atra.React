import { useState } from "react";
import { Category } from "../Details/Form/constants";
import { PRODUCT_CATEGORY_LABELS } from "../Products/Form/constants";

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
          allPath: `all`,
          addPath: `add`,
          label: "Всички",
        },
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
          allPath: `all`,
          addPath: "add",
          label: "Всички",
        },
        {
          allPath: `all?category=${PRODUCT_CATEGORY_LABELS[0]}`,
          addPath: `add?category=${PRODUCT_CATEGORY_LABELS[0]}`,
          label: "Други",
        },
        {
          allPath: `all?category=${PRODUCT_CATEGORY_LABELS[1]}`,
          addPath: `add?category=${PRODUCT_CATEGORY_LABELS[1]}`,
          label: "Осветителни тела",
        },
        {
          allPath: `all?category=${PRODUCT_CATEGORY_LABELS[2]}`,
          addPath: `add?category=${PRODUCT_CATEGORY_LABELS[2]}`,
          label: "Професионални LED осветителни тела",
        },
        {
          allPath: `all?category=${PRODUCT_CATEGORY_LABELS[3]}`,
          addPath: `add?category=${PRODUCT_CATEGORY_LABELS[3]}`,
          label: "Електроинсталационни материали",
        },
        {
          allPath: `all?category=${PRODUCT_CATEGORY_LABELS[4]}`,
          addPath: `add?category=${PRODUCT_CATEGORY_LABELS[4]}`,
          label: "Взривозащитени изделия",
        },
        {
          allPath: `all?category=${PRODUCT_CATEGORY_LABELS[5]}`,
          addPath: `add?category=${PRODUCT_CATEGORY_LABELS[5]}`,
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
