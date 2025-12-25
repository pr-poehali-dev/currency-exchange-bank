import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isSpicy: boolean;
  isVegetarian: boolean;
}

const Menu = () => {
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Фунчоза с овощами',
      nameEn: 'Glass Noodles with Vegetables',
      description: 'Стеклянная лапша с морковью, огурцом, болгарским перцем и кунжутом',
      price: 450,
      image: 'https://cdn.poehali.dev/files/image.png',
      category: 'Азиатская кухня',
      isSpicy: true,
      isVegetarian: true,
    },
    {
      id: 2,
      name: 'Том Ям',
      nameEn: 'Tom Yum',
      description: 'Острый тайский суп с креветками, грибами и лемонграссом',
      price: 550,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
      category: 'Супы',
      isSpicy: true,
      isVegetarian: false,
    },
    {
      id: 3,
      name: 'Pad Thai',
      nameEn: 'Pad Thai',
      description: 'Традиционная тайская лапша с креветками, арахисом и тамариндом',
      price: 480,
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
      category: 'Азиатская кухня',
      isSpicy: false,
      isVegetarian: false,
    },
    {
      id: 4,
      name: 'Спринг-роллы',
      nameEn: 'Spring Rolls',
      description: 'Хрустящие роллы с овощами и соусом sweet chili',
      price: 320,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
      category: 'Закуски',
      isSpicy: false,
      isVegetarian: true,
    },
    {
      id: 5,
      name: 'Карри с курицей',
      nameEn: 'Chicken Curry',
      description: 'Нежное карри с кокосовым молоком, овощами и рисом жасмин',
      price: 520,
      image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800',
      category: 'Горячие блюда',
      isSpicy: true,
      isVegetarian: false,
    },
    {
      id: 6,
      name: 'Манго стики райс',
      nameEn: 'Mango Sticky Rice',
      description: 'Сладкий клейкий рис с манго и кокосовым соусом',
      price: 380,
      image: 'https://images.unsplash.com/photo-1604467707321-70d5ac45adda?w=800',
      category: 'Десерты',
      isSpicy: false,
      isVegetarian: true,
    },
  ];

  const categories = ['Все блюда', ...Array.from(new Set(menuItems.map((item) => item.category)))];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Icon name="UtensilsCrossed" size={20} className="text-primary" />
              <span className="text-sm font-semibold text-primary">Кафе при обменнике</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Азиатская кухня
              <br />
              <span className="text-primary">с доставкой</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Пока ожидаете обмен валюты — закажите вкусный обед!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Icon name="Clock" size={16} className="mr-2" />
                Доставка 30 мин
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Icon name="Percent" size={16} className="mr-2" />
                Скидка 10% при обмене
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Icon name="ShieldCheck" size={16} className="mr-2" />
                Свежие продукты
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'Все блюда' ? 'default' : 'outline'}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {item.isSpicy && (
                      <Badge variant="destructive" className="backdrop-blur-sm bg-red-500/90">
                        🌶️ Острое
                      </Badge>
                    )}
                    {item.isVegetarian && (
                      <Badge variant="secondary" className="backdrop-blur-sm bg-green-500/90 text-white">
                        🌱 Вегетарианское
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="backdrop-blur-sm bg-primary/90">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 italic">{item.nameEn}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">{item.price} ₽</div>
                    <Button size="sm" className="gap-2">
                      <Icon name="ShoppingCart" size={16} />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground flex flex-col justify-center">
                  <Icon name="Gift" size={48} className="mb-4" />
                  <h2 className="text-3xl font-bold mb-4">Специальное предложение!</h2>
                  <p className="text-lg mb-6 opacity-90">
                    При обмене валюты от 10 000 ₽ — скидка 15% на всё меню
                  </p>
                  <Button size="lg" variant="secondary" className="w-fit">
                    Узнать подробнее
                  </Button>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4">Как получить скидку?</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary">1</span>
                      </div>
                      <p className="text-muted-foreground">
                        Обменяйте валюту на сумму от 10 000 ₽
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary">2</span>
                      </div>
                      <p className="text-muted-foreground">Покажите чек из обменника</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary">3</span>
                      </div>
                      <p className="text-muted-foreground">
                        Получите скидку 15% на любой заказ!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
