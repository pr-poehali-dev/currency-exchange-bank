import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface CurrencyRate {
  code: string;
  name: string;
  flag: string;
  buy: number;
  sell: number;
  change: number;
}

const Rates = () => {
  const [search, setSearch] = useState('');

  const currencies: CurrencyRate[] = [
    { code: 'USD', name: 'Доллар США', flag: '🇺🇸', buy: 92.50, sell: 94.20, change: 0.45 },
    { code: 'EUR', name: 'Евро', flag: '🇪🇺', buy: 99.80, sell: 102.10, change: -0.23 },
    { code: 'GBP', name: 'Фунт стерлингов', flag: '🇬🇧', buy: 115.30, sell: 118.50, change: 0.67 },
    { code: 'CNY', name: 'Китайский юань', flag: '🇨🇳', buy: 12.85, sell: 13.40, change: 0.12 },
    { code: 'JPY', name: 'Японская йена', flag: '🇯🇵', buy: 0.62, sell: 0.65, change: -0.05 },
    { code: 'CHF', name: 'Швейцарский франк', flag: '🇨🇭', buy: 105.20, sell: 108.30, change: 0.34 },
    { code: 'TRY', name: 'Турецкая лира', flag: '🇹🇷', buy: 2.75, sell: 2.95, change: -1.20 },
    { code: 'AED', name: 'Дирхам ОАЭ', flag: '🇦🇪', buy: 25.10, sell: 26.20, change: 0.18 },
  ];

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(search.toLowerCase()) ||
      currency.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-2">Курсы валют</h1>
            <p className="text-muted-foreground">Актуальные курсы обмена на сегодня</p>
          </div>

          <Card className="mb-6 animate-scale-in">
            <CardContent className="pt-6">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск валюты..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {filteredCurrencies.map((currency, index) => (
              <Card
                key={currency.code}
                className="hover:shadow-lg transition-shadow cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{currency.flag}</div>
                      <div>
                        <div className="font-bold text-lg">{currency.code}</div>
                        <div className="text-sm text-muted-foreground">{currency.name}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">Покупка</div>
                        <div className="font-mono text-lg font-semibold">{currency.buy.toFixed(2)} ₽</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">Продажа</div>
                        <div className="font-mono text-lg font-semibold">{currency.sell.toFixed(2)} ₽</div>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <div
                          className={`flex items-center gap-1 justify-end font-semibold ${
                            currency.change > 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          <Icon
                            name={currency.change > 0 ? 'TrendingUp' : 'TrendingDown'}
                            size={16}
                          />
                          <span className="font-mono">{Math.abs(currency.change)}%</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">за 24ч</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCurrencies.length === 0 && (
            <Card className="animate-fade-in">
              <CardContent className="p-12 text-center">
                <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Валюта не найдена</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rates;
