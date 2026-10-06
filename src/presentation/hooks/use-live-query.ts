import { addDatabaseChangeListener } from "expo-sqlite";
import React from "react";

export function useLiveQuery<T>(tables: string[], query: () => Promise<T>, initialData: T) {
  const [data, setData] = React.useState<T>(initialData);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);

  // Evita que uma resposta antiga sobrescreva uma mais nova
  const requestIdRef = React.useRef(0);
  const tablesKey = tables.join(",");

  const refetch = React.useCallback(async () => {
    const requestId = ++requestIdRef.current;

    try {
      const result = await query();
      if (requestId !== requestIdRef.current) return;

      setData(result);
      setError(null);
      setIsLoading(false);
    } catch (e) {
      if (requestId !== requestIdRef.current) return;
      setError(e instanceof Error ? e : new Error(String(e)));
      setIsLoading(false);
    }
  }, [query]);

  React.useEffect(() => {
    const watched = new Set(tablesKey.split(","));

    void refetch();

    const subscription = addDatabaseChangeListener(({ tableName }) => {
      if (watched.has(tableName)) void refetch();
    });

    return () => {
      requestIdRef.current++; // invalida requisições em andamento
      subscription.remove();
    };
  }, [tablesKey, refetch]);

  return { data, isLoading, error, refetch };
}
