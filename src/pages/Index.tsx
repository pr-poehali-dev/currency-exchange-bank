import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Currency {
  code: string;
  name: string;
  flag: string;
  rate: number;
}

const Index = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('RUB');
  const [amount, setAmount] = useState<string>('100');

  const currencies: Currency[] = [
    { code: 'RUB', name: 'Российский рубль', flag: '🇷🇺', rate: 1 },
    { code: 'USD', name: 'Доллар США', flag: '🇺🇸', rate: 94.20 },
    { code: 'EUR', name: 'Евро', flag: '🇪🇺', rate: 102.10 },
    { code: 'GBP', name: 'Фунт стерлингов', flag: '🇬🇧', rate: 118.50 },
    { code: 'CNY', name: 'Китайский юань', flag: '🇨🇳', rate: 13.40 },
    { code: 'JPY', name: 'Японская йена', flag: '🇯🇵', rate: 0.65 },
  ];

  const fromRate = currencies.find((c) => c.code === fromCurrency)?.rate || 1;
  const toRate = currencies.find((c) => c.code === toCurrency)?.rate || 1;
  const numAmount = parseFloat(amount) || 0;
  const result = (numAmount * fromRate) / toRate;

  const popularRates = [
    { from: 'USD', to: 'RUB', rate: 94.20, change: 0.45 },
    { from: 'EUR', to: 'RUB', rate: 102.10, change: -0.23 },
    { from: 'GBP', to: 'RUB', rate: 118.50, change: 0.67 },
  ];

  const features = [
    {
      icon: 'Shield',
      title: 'Безопасность',
      description: 'Лицензия ЦБ РФ и полная защита данных',
    },
    {
      icon: 'Zap',
      title: 'Быстрый обмен',
      description: 'Операции за 2-3 минуты в любом офисе',
    },
    {
      icon: 'Percent',
      title: 'Без комиссий',
      description: 'Выгодный курс без скрытых платежей',
    },
    {
      icon: 'Clock',
      title: 'Работаем 24/7',
      description: 'Обмен валюты в удобное для вас время',
    },
  ];

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
              Обмен валюты
              <br />
              <span className="text-primary">по лучшему курсу</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Быстро, безопасно и выгодно в любом из наших офисов
            </p>
          </div>

          <Card className="max-w-3xl mx-auto shadow-xl animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl">Калькулятор обмена</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Отдаю</label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-lg font-mono"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Валюта</label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="text-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            <div className="flex items-center gap-2">
                              <span>{currency.flag}</span>
                              <span>{currency.code}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={swapCurrencies}
                  >
                    <Icon name="ArrowLeftRight" size={20} />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Получаю</label>
                    <div className="h-10 px-3 flex items-center border border-border rounded-lg bg-secondary/50">
                      <span className="text-lg font-mono font-semibold text-primary">
                        {result.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Валюта</label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger className="text-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            <div className="flex items-center gap-2">
                              <span>{currency.flag}</span>
                              <span>{currency.code}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/30 p-4 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Курс обмена</span>
                  <span className="font-mono font-semibold">
                    1 {fromCurrency} = {(fromRate / toRate).toFixed(4)} {toCurrency}
                  </span>
                </div>
              </div>

              <Button size="lg" className="w-full text-lg">
                <Icon name="ArrowRight" size={20} className="mr-2" />
                Забронировать обмен
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Популярные курсы</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {popularRates.map((rate, index) => (
              <Card
                key={`${rate.from}-${rate.to}`}
                className="hover:shadow-lg transition-shadow animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">
                    {currencies.find((c) => c.code === rate.from)?.flag} →{' '}
                    {currencies.find((c) => c.code === rate.to)?.flag}
                  </div>
                  <div className="text-2xl font-bold mb-2">
                    {rate.from}/{rate.to}
                  </div>
                  <div className="font-mono text-3xl font-bold text-primary mb-3">
                    {rate.rate.toFixed(2)}
                  </div>
                  <div
                    className={`flex items-center justify-center gap-1 text-sm font-semibold ${
                      rate.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    <Icon name={rate.change > 0 ? 'TrendingUp' : 'TrendingDown'} size={16} />
                    <span>{Math.abs(rate.change)}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Почему мы?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="text-center hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name={feature.icon as any} size={32} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
