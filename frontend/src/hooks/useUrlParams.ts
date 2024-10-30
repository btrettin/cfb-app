import { useSearchParams } from 'react-router-dom';

type urlHooks = {
  week: number;
  setWeek: (value: string) => void;
};
export function useUrlParams(): urlHooks {
  const [searchParams, setSearchParams] = useSearchParams();
  const week: number = parseInt(searchParams.get('week') || '1', 10);

  function setParam(param: string, value: string) {
    searchParams.set(param, value);
    setSearchParams(searchParams);
  }

  function setWeek(value: string) {
    setParam('week', value);
  }

  return { week, setWeek };
}
