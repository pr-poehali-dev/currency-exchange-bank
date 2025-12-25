import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  metro: string;
}

const Contacts = () => {
  const offices: Office[] = [
    {
      id: '1',
      name: 'Офис на Тверской',
      address: 'ул. Тверская, д. 12, Москва',
      phone: '+7 (495) 123-45-67',
      hours: 'Пн-Вс: 09:00 - 21:00',
      metro: 'Тверская',
    },
    {
      id: '2',
      name: 'Офис на Арбате',
      address: 'ул. Арбат, д. 5, Москва',
      phone: '+7 (495) 234-56-78',
      hours: 'Пн-Вс: 10:00 - 20:00',
      metro: 'Арбатская',
    },
    {
      id: '3',
      name: 'Офис на Невском',
      address: 'Невский проспект, д. 28, Санкт-Петербург',
      phone: '+7 (812) 345-67-89',
      hours: 'Пн-Сб: 09:00 - 19:00',
      metro: 'Невский проспект',
    },
  ];

  const contacts = [
    {
      icon: 'Phone',
      title: 'Телефон',
      value: '8 (800) 555-35-35',
      description: 'Бесплатный звонок по России',
    },
    {
      icon: 'Mail',
      title: 'Email',
      value: 'info@exchangehub.ru',
      description: 'Ответим в течение часа',
    },
    {
      icon: 'MessageCircle',
      title: 'Telegram',
      value: '@exchangehub_bot',
      description: 'Онлайн-консультация 24/7',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-2">Контакты</h1>
            <p className="text-muted-foreground">Наши офисы и способы связи</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {contacts.map((contact, index) => (
              <Card
                key={contact.title}
                className="hover:shadow-lg transition-shadow animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name={contact.icon as any} size={28} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{contact.title}</h3>
                  <div className="font-mono font-semibold text-primary mb-2">{contact.value}</div>
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 animate-fade-in">Наши офисы</h2>
            <div className="grid gap-6">
              {offices.map((office, index) => (
                <Card
                  key={office.id}
                  className="hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl mb-3">{office.name}</h3>
                        <div className="space-y-2">
                          <div className="flex items-start gap-3">
                            <Icon name="MapPin" size={20} className="text-primary mt-0.5" />
                            <div>
                              <div className="font-medium">{office.address}</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                м. {office.metro}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Icon name="Phone" size={20} className="text-primary" />
                            <a
                              href={`tel:${office.phone}`}
                              className="font-mono hover:text-primary transition-colors"
                            >
                              {office.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-3">
                            <Icon name="Clock" size={20} className="text-primary" />
                            <span>{office.hours}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="md:self-start">
                        <Icon name="Navigation" size={18} className="mr-2" />
                        Маршрут
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 animate-fade-in">
            <CardContent className="p-8 text-center">
              <Icon name="Headphones" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Нужна помощь?</h3>
              <p className="text-muted-foreground mb-6">
                Наша служба поддержки готова ответить на любые вопросы
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Написать в чат
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Заказать звонок
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
