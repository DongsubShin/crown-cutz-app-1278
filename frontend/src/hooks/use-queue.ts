import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api/api-client';
import { QueueEntry } from '../types';

export const queueKeys = {
  all: ['queue'] as const,
  live: () => [...queueKeys.all, 'live'] as const,
};

export function useLiveQueue() {
  return useQuery({
    queryKey: queueKeys.live(),
    queryFn: async () => {
      const { data } = await apiClient.get<QueueEntry[]>('/queue/live');
      return data;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useJoinQueue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entry: Partial<QueueEntry>) => {
      const { data } = await apiClient.post<QueueEntry>('/queue/join', entry);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queueKeys.live() });
    },
  });
}