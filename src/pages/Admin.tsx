import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Icon from '@/components/ui/icon';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('balances');

  const accountBalances = [
    { id: 1, currency: 'USD', balance: 125000, reserved: 15000, available: 110000, flag: '🇺🇸' },
    { id: 2, currency: 'EUR', balance: 98000, reserved: 8000, available: 90000, flag: '🇪🇺' },
    { id: 3, currency: 'RUB', balance: 8500000, reserved: 500000, available: 8000000, flag: '🇷🇺' },
    { id: 4, currency: 'GBP', balance: 45000, reserved: 5000, available: 40000, flag: '🇬🇧' },
    { id: 5, currency: 'CNY', balance: 520000, reserved: 20000, available: 500000, flag: '🇨🇳' },
  ];

  const clients = [
    { id: 1, name: 'Иванов Иван', phone: '+7 999 123-45-67', totalTransactions: 15, totalVolume: 450000, status: 'active', limit: 1000000 },
    { id: 2, name: 'Петрова Мария', phone: '+7 999 234-56-78', totalTransactions: 8, totalVolume: 280000, status: 'active', limit: 500000 },
    { id: 3, name: 'Сидоров Петр', phone: '+7 999 345-67-89', totalTransactions: 23, totalVolume: 890000, status: 'vip', limit: 5000000 },
    { id: 4, name: 'Козлова Анна', phone: '+7 999 456-78-90', totalTransactions: 3, totalVolume: 75000, status: 'new', limit: 100000 },
  ];

  const dailyStats = [
    { date: '2024-12-25', transactions: 45, volume: 4250000, profit: 85000, clients: 32 },
    { date: '2024-12-24', transactions: 38, volume: 3890000, profit: 78000, clients: 28 },
    { date: '2024-12-23', transactions: 52, volume: 5120000, profit: 102000, clients: 41 },
    { date: '2024-12-22', transactions: 41, volume: 4100000, profit: 82000, clients: 35 },
    { date: '2024-12-21', transactions: 36, volume: 3600000, profit: 72000, clients: 29 },
  ];

  const cashOperations = [
    { id: 1, type: 'Пополнение', currency: 'USD', amount: 50000, operator: 'Кассир 1', time: '14:35', status: 'completed' },
    { id: 2, type: 'Выдача', currency: 'EUR', amount: 30000, operator: 'Кассир 2', time: '14:12', status: 'completed' },
    { id: 3, type: 'Инкассация', currency: 'RUB', amount: 500000, operator: 'Инкассатор', time: '13:45', status: 'completed' },
    { id: 4, type: 'Пополнение', currency: 'GBP', amount: 15000, operator: 'Кассир 1', time: '12:20', status: 'completed' },
  ];

  const currentRates = [
    { currency: 'USD/RUB', buy: 94.20, sell: 96.50, change: 0.45, trend: 'up' },
    { currency: 'EUR/RUB', buy: 102.10, sell: 104.80, change: -0.23, trend: 'down' },
    { currency: 'GBP/RUB', buy: 118.50, sell: 121.20, change: 0.67, trend: 'up' },
    { currency: 'CNY/RUB', buy: 13.40, sell: 13.80, change: 0.12, trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold mb-2">Панель управления</h1>
              <p className="text-muted-foreground">Управление обменным пунктом</p>
            </div>
            <Button size="lg" className="gap-2">
              <Icon name="Download" size={20} />
              Экспорт отчёта
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Wallet" size={24} className="text-primary" />
                  <Badge variant="secondary" className="text-green-600">
                    <Icon name="TrendingUp" size={12} className="mr-1" />
                    +12%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Оборот за день</p>
                <p className="text-2xl font-bold">4.25М ₽</p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{ animationDelay: '100ms' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="ArrowLeftRight" size={24} className="text-primary" />
                  <Badge variant="secondary">Сегодня</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Транзакций</p>
                <p className="text-2xl font-bold">45</p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="Users" size={24} className="text-primary" />
                  <Badge variant="secondary">Активных</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Клиентов</p>
                <p className="text-2xl font-bold">32</p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{ animationDelay: '300ms' }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="TrendingUp" size={24} className="text-primary" />
                  <Badge variant="secondary" className="text-green-600">
                    <Icon name="TrendingUp" size={12} className="mr-1" />
                    +8%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Прибыль</p>
                <p className="text-2xl font-bold">85К ₽</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
            <TabsList className="grid grid-cols-3 lg:grid-cols-7 mb-6">
              <TabsTrigger value="balances" className="gap-2">
                <Icon name="Wallet" size={16} />
                <span className="hidden sm:inline">Балансы</span>
              </TabsTrigger>
              <TabsTrigger value="clients" className="gap-2">
                <Icon name="Users" size={16} />
                <span className="hidden sm:inline">Клиенты</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="gap-2">
                <Icon name="BarChart3" size={16} />
                <span className="hidden sm:inline">Статистика</span>
              </TabsTrigger>
              <TabsTrigger value="transactions" className="gap-2">
                <Icon name="Receipt" size={16} />
                <span className="hidden sm:inline">Транзакции</span>
              </TabsTrigger>
              <TabsTrigger value="cash" className="gap-2">
                <Icon name="Banknote" size={16} />
                <span className="hidden sm:inline">Касса</span>
              </TabsTrigger>
              <TabsTrigger value="limits" className="gap-2">
                <Icon name="ShieldAlert" size={16} />
                <span className="hidden sm:inline">Лимиты</span>
              </TabsTrigger>
              <TabsTrigger value="rates" className="gap-2">
                <Icon name="LineChart" size={16} />
                <span className="hidden sm:inline">Курсы</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="balances">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Wallet" size={24} />
                    Балансы счетов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Валюта</TableHead>
                        <TableHead className="text-right">Баланс</TableHead>
                        <TableHead className="text-right">В резерве</TableHead>
                        <TableHead className="text-right">Доступно</TableHead>
                        <TableHead className="text-right">Статус</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {accountBalances.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{account.flag}</span>
                              <span>{account.currency}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {account.balance.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right font-mono text-orange-600">
                            {account.reserved.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right font-mono font-semibold text-green-600">
                            {account.available.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <Icon name="CheckCircle" size={14} className="mr-1" />
                              Норма
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clients">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" size={24} />
                    Детали клиентов
                  </CardTitle>
                  <div className="flex gap-2">
                    <Input placeholder="Поиск клиента..." className="w-64" />
                    <Button variant="outline" size="icon">
                      <Icon name="Search" size={20} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Клиент</TableHead>
                        <TableHead>Телефон</TableHead>
                        <TableHead className="text-right">Транзакций</TableHead>
                        <TableHead className="text-right">Объём</TableHead>
                        <TableHead className="text-right">Лимит</TableHead>
                        <TableHead className="text-right">Статус</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell className="font-mono text-sm">{client.phone}</TableCell>
                          <TableCell className="text-right">{client.totalTransactions}</TableCell>
                          <TableCell className="text-right font-mono">
                            {client.totalVolume.toLocaleString()} ₽
                          </TableCell>
                          <TableCell className="text-right font-mono text-muted-foreground">
                            {(client.limit / 1000).toFixed(0)}К
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant={
                                client.status === 'vip'
                                  ? 'default'
                                  : client.status === 'new'
                                  ? 'secondary'
                                  : 'outline'
                              }
                            >
                              {client.status === 'vip'
                                ? '⭐ VIP'
                                : client.status === 'new'
                                ? '🆕 Новый'
                                : '✅ Активный'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" size={24} />
                    Ежедневная статистика
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Дата</TableHead>
                        <TableHead className="text-right">Транзакций</TableHead>
                        <TableHead className="text-right">Оборот</TableHead>
                        <TableHead className="text-right">Прибыль</TableHead>
                        <TableHead className="text-right">Клиентов</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dailyStats.map((stat) => (
                        <TableRow key={stat.date}>
                          <TableCell className="font-medium">{stat.date}</TableCell>
                          <TableCell className="text-right">{stat.transactions}</TableCell>
                          <TableCell className="text-right font-mono">
                            {(stat.volume / 1000000).toFixed(2)}М ₽
                          </TableCell>
                          <TableCell className="text-right font-mono font-semibold text-green-600">
                            {stat.profit.toLocaleString()} ₽
                          </TableCell>
                          <TableCell className="text-right">{stat.clients}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Receipt" size={24} />
                    История транзакций
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Используйте страницу "История" для просмотра всех транзакций
                  </p>
                  <Button className="mt-4" onClick={() => window.location.href = '/history'}>
                    <Icon name="ArrowRight" size={20} className="mr-2" />
                    Перейти к истории
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cash">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Banknote" size={24} />
                    Кассовые операции
                  </CardTitle>
                  <Button className="gap-2">
                    <Icon name="Plus" size={20} />
                    Новая операция
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Тип операции</TableHead>
                        <TableHead>Валюта</TableHead>
                        <TableHead className="text-right">Сумма</TableHead>
                        <TableHead>Оператор</TableHead>
                        <TableHead>Время</TableHead>
                        <TableHead className="text-right">Статус</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cashOperations.map((operation) => (
                        <TableRow key={operation.id}>
                          <TableCell className="font-medium">{operation.type}</TableCell>
                          <TableCell>{operation.currency}</TableCell>
                          <TableCell className="text-right font-mono">
                            {operation.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>{operation.operator}</TableCell>
                          <TableCell className="font-mono text-sm">{operation.time}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <Icon name="CheckCircle" size={14} className="mr-1" />
                              Завершено
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="limits">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ShieldAlert" size={24} />
                    Лимиты клиентов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clients.map((client) => (
                      <div
                        key={client.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <div>
                          <p className="font-semibold">{client.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Использовано: {((client.totalVolume / client.limit) * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-semibold">
                            {client.limit.toLocaleString()} ₽
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Icon name="Settings" size={14} className="mr-1" />
                            Изменить
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rates">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="LineChart" size={24} />
                    Текущие курсы
                  </CardTitle>
                  <Button variant="outline" className="gap-2">
                    <Icon name="RefreshCw" size={16} />
                    Обновить
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Пара</TableHead>
                        <TableHead className="text-right">Покупка</TableHead>
                        <TableHead className="text-right">Продажа</TableHead>
                        <TableHead className="text-right">Изменение</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentRates.map((rate) => (
                        <TableRow key={rate.currency}>
                          <TableCell className="font-semibold">{rate.currency}</TableCell>
                          <TableCell className="text-right font-mono text-green-600">
                            {rate.buy.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-red-600">
                            {rate.sell.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant="secondary"
                              className={
                                rate.trend === 'up'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }
                            >
                              <Icon
                                name={rate.trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
                                size={14}
                                className="mr-1"
                              />
                              {rate.change > 0 ? '+' : ''}
                              {rate.change}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              <Icon name="Edit" size={14} className="mr-1" />
                              Изменить
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
