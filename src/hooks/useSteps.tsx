import { useRouter } from "next/navigation";
import { JSX, useState } from "react";

export const useSteps = ({
  defaultPage,
  pages,
}: {
  defaultPage?: number;
  pages: (() => JSX.Element)[];
}) => {
  const { push } = useRouter();
  const initialPage = defaultPage ? defaultPage : 0;
  const [activePage, setActivePage] = useState(initialPage);

  const nextPage = () => {
    setActivePage((prev) => (activePage < pages.length - 1 ? prev + 1 : prev));
  };
  const prevPage = () => {
    const isFirstContent = activePage === 0;

    if (isFirstContent) {
      return push("/");
    } else {
      setActivePage((prev) => prev - 1);
    }
  };
  return { nextPage, prevPage, activePage, setActivePage };
};
