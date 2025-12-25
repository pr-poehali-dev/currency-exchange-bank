import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Transaction {
  id: string;
  date: string;
  time: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  status: 'completed' | 'pending' | 'cancelled';
  commission: number;
  location: string;
}

const History = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');

  const transactions: Transaction[] = [
    {
      id: 'TX-2025-001',
      date: '2025-12-24',
      time: '14:32',
      fromCurrency: 'USD',
      toCurrency: 'RUB',
      fromAmount: 500,
      toAmount: 47100,
      rate: 94.20,
      status: 'completed',
      commission: 150,
      location: 'Офис на Тверской, 12',
    },
    {
      id: 'TX-2025-002',
      date: '2025-12-22',
      time: '11:15',
      fromCurrency: 'EUR',
      toCurrency: 'RUB',
      fromAmount: 300,
      toAmount: 30630,
      rate: 102.10,
      status: 'completed',
      commission: 120,
      location: 'Офис на Арбате, 5',
    },
    {
      id: 'TX-2025-003',
      date: '2025-12-20',
      time: '16:48',
      fromCurrency: 'RUB',
      toCurrency: 'GBP',
      fromAmount: 23500,
      toAmount: 200,
      rate: 117.50,
      status: 'completed',
      commission: 200,
      location: 'Офис на Тверской, 12',
    },
    {
      id: 'TX-2025-004',
      date: '2025-12-18',
      time: '09:22',
      fromCurrency: 'CNY',
      toCurrency: 'RUB',
      fromAmount: 1000,
      toAmount: 13400,
      rate: 13.40,
      status: 'completed',
      commission: 80,
      location: 'Офис на Невском, 28',
    },
  ];

  const filteredTransactions =
    filter === 'all' ? transactions : transactions.filter((t) => t.status === filter);

  const statusConfig = {
    completed: { label: 'Завершена', color: 'bg-green-100 text-green-700' },
    pending: { label: 'В обработке', color: 'bg-yellow-100 text-yellow-700' },
    cancelled: { label: 'Отменена', color: 'bg-red-100 text-red-700' },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-2">История операций</h1>
            <p className="text-muted-foreground">Все ваши обменные операции с детальными чеками</p>
          </div>

          <Card className="mb-6 animate-scale-in">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {(['all', 'completed', 'pending', 'cancelled'] as const).map((status) => (
                  <Button
                    key={status}
                    variant={filter === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter(status)}
                  >
                    {status === 'all'
                      ? 'Все'
                      : status === 'completed'
                      ? 'Завершенные'
                      : status === 'pending'
                      ? 'В обработке'
                      : 'Отмененные'}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {filteredTransactions.map((transaction, index) => (
              <Card
                key={transaction.id}
                className="hover:shadow-lg transition-all cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedTransaction(transaction)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="ArrowLeftRight" size={24} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">
                          {transaction.fromCurrency} → {transaction.toCurrency}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {transaction.date} в {transaction.time}
                        </div>
                      </div>
                    </div>
                    <Badge className={statusConfig[transaction.status].color}>
                      {statusConfig[transaction.status].label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Отдали</div>
                      <div className="font-mono font-semibold text-lg">
                        {transaction.fromAmount.toLocaleString()} {transaction.fromCurrency}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Получили</div>
                      <div className="font-mono font-semibold text-lg text-primary">
                        {transaction.toAmount.toLocaleString()} {transaction.toCurrency}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <Card className="animate-fade-in">
              <CardContent className="p-12 text-center">
                <Icon name="FileX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Операции не найдены</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Детали операции</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-2">Номер операции</div>
                <div className="font-mono font-bold text-xl">{selectedTransaction.id}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Дата и время</div>
                  <div className="font-medium">
                    {selectedTransaction.date}
                    <br />
                    {selectedTransaction.time}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Статус</div>
                  <Badge className={statusConfig[selectedTransaction.status].color}>
                    {statusConfig[selectedTransaction.status].label}
                  </Badge>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Отдали</span>
                  <span className="font-mono font-semibold">
                    {selectedTransaction.fromAmount.toLocaleString()} {selectedTransaction.fromCurrency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Курс</span>
                  <span className="font-mono">{selectedTransaction.rate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Комиссия</span>
                  <span className="font-mono">{selectedTransaction.commission} ₽</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                  <span>Получили</span>
                  <span className="font-mono text-primary">
                    {selectedTransaction.toAmount.toLocaleString()} {selectedTransaction.toCurrency}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="text-xs text-muted-foreground mb-1">Место обмена</div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="font-medium">{selectedTransaction.location}</span>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Icon name="Download" size={18} className="mr-2" />
                Скачать чек
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default History;
