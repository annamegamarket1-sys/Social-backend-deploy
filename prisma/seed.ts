import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const CDN = 'https://res.cloudinary.com/dcposai6j/image/upload';
const avatars = {
  default:     `${CDN}/v1778799272/default_zjntnx.png`,
  seneka:      `${CDN}/v1778799271/seneka_jlykel.png`,
  epictetus:   `${CDN}/v1778799272/epictetus_sybxnh.jpg`,
  kaligula:    `${CDN}/v1778799271/kaligula_fwyxhk.png`,
  decart:      `${CDN}/v1778799271/decart_ffzm8s.jpg`,
  hume:        `${CDN}/v1778799271/hume_vaebit.jpg`,
  john_lokk:   `${CDN}/v1778799271/john_lokk_rtks0r.jpg`,
  leibniz:     `${CDN}/v1778799272/leibniz_gbpqjv.jpg`,
  makiavelli:  `${CDN}/v1778799272/makiavelli_pftshb.jpg`,
  montesquieu: `${CDN}/v1778799272/montesquieu_cy288z.jpg`,
  russo:       `${CDN}/v1778799272/russo_uji2iy.jpg`,
  volter:      `${CDN}/v1778799272/volter_ofmfla.jpg`,
};

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "reports", "likes", "comments", "follows", "posts", "users" RESTART IDENTITY CASCADE',
  );

  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      username: 'Администратор',
      tag: 'admin',
      email: 'admin@example.com',
      role: Role.ADMIN,
      passwordHash: adminPasswordHash,
      bio: 'Главный администратор платформы',
      avatar: avatars.default,
    },
  });

  const seneca = await prisma.user.create({
    data: {
      username: 'Сенека',
      tag: 'seneca',
      email: 'seneca@example.com',
      role: Role.USER,
      passwordHash: hashedPassword,
      bio: 'Римский философ-стоик',
      avatar: avatars.seneka,
    },
  });

  const epictetus = await prisma.user.create({
    data: {
      username: 'Эпиктет',
      tag: 'epictetus',
      email: 'epictetus@example.com',
      role: Role.USER,
      passwordHash: hashedPassword,
      bio: 'Греческий философ-стоик',
      avatar: avatars.epictetus,
    },
  });

  const caligula = await prisma.user.create({
    data: {
      username: 'Калигула',
      tag: 'caligula',
      email: 'caligula@example.com',
      role: Role.USER,
      passwordHash: hashedPassword,
      bio: 'Римский император и философ',
      avatar: avatars.kaligula,
    },
  });

  const descartes = await prisma.user.create({
    data: {
      username: 'Рене Декарт',
      tag: 'descartes',
      email: 'descartes@example.com',
      role: Role.USER,
      passwordHash: hashedPassword,
      bio: 'Французский философ и математик',
      avatar: avatars.decart,
    },
  });

  const hume = await prisma.user.create({
    data: {
      username: 'Дэвид Юм',
      tag: 'hume',
      email: 'hume@example.com',
      role: Role.USER,
      passwordHash: hashedPassword,
      bio: 'Шотландский философ-эмпирик',
      avatar: avatars.hume,
    },
  });

  const locke = await prisma.user.create({
    data: {
      username: 'Джон Локк',
      tag: 'locke',
      email: 'locke@example.com',
      role: Role.USER,
      passwordHash: hashedPassword,
      bio: 'Английский философ, основатель либерализма',
      avatar: avatars.john_lokk,
    },
  });

  const leibniz = await prisma.user.create({
    data: {
      username: 'Готфрид Лейбниц',
      tag: 'leibniz',
      email: 'leibniz@example.com',
      role: Role.USER,
      passwordHash: hashedPassword,
      bio: 'Немецкий философ и математик',
      avatar: avatars.leibniz,
    },
  });

  const machiavelli = await prisma.user.create({
    data: {
      username: 'Никколо Макиавелли',
      tag: 'machiavelli',
      email: 'machiavelli@example.com',
      role: Role.USER,
      passwordHash: hashedPassword,
      bio: 'Итальянский мыслитель эпохи Возрождения',
      avatar: avatars.makiavelli,
    },
  });

  const montesquieu = await prisma.user.create({
    data: {
      username: 'Шарль Монтескье',
      tag: 'montesquieu',
      email: 'montesquieu@example.com',
      role: Role.USER,
      passwordHash: hashedPassword,
      bio: 'Французский философ-просветитель',
      avatar: avatars.montesquieu,
    },
  });

  const rousseau = await prisma.user.create({
    data: {
      username: 'Жан-Жак Руссо',
      tag: 'rousseau',
      email: 'rousseau@example.com',
      role: Role.USER,
      passwordHash: hashedPassword,
      bio: 'Французский мыслитель эпохи Просвещения',
      avatar: avatars.russo,
    },
  });

  const voltaire = await prisma.user.create({
    data: {
      username: 'Вольтер',
      tag: 'voltaire',
      email: 'voltaire@example.com',
      role: Role.USER,
      passwordHash: hashedPassword,
      bio: 'Французский философ-просветитель и писатель',
      avatar: avatars.volter,
    },
  });

  const user = await prisma.user.create({
    data: {
      username: 'Пользователь',
      tag: 'user',
      email: 'user@example.com',
      role: Role.USER,
      passwordHash: hashedPassword,
      bio: 'Тестовый пользователь',
      avatar: avatars.default,
    },
  });

  await prisma.post.create({ data: { userId: voltaire.id, content: 'Рим, Петербург, Париж — камень не лжёт. Цивилизацию измеряют не законами, а тем, что остаётся после их забвения. Я объездил достаточно, чтобы знать: архитектура — единственная философия, доступная всем.', images: ['https://res.cloudinary.com/dcposai6j/image/upload/v1778800572/Rom__IT__Kolosseum__-__2024__-__0610_oi1mkm.jpg','https://res.cloudinary.com/dcposai6j/image/upload/v1778800469/235817291_zvhkc0.jpg','https://res.cloudinary.com/dcposai6j/image/upload/v1778800470/gotica-8_ee8grj.jpg','https://res.cloudinary.com/dcposai6j/image/upload/v1778800470/756270648259822_nxrahc.jpg'] } });
  await prisma.post.create({ data: { userId: epictetus.id, content: 'Мудрец не раб желудка. Десерт, рыба, специи — всё это лишь материя. Но если ты не можешь отказаться от сладкого, как ты откажешься от страха, гнева и тщеславия? Начни с тарелки.', images: ['https://res.cloudinary.com/dcposai6j/image/upload/v1777206596/samples/food/dessert.jpg','https://res.cloudinary.com/dcposai6j/image/upload/v1777206597/samples/food/fish-vegetables.jpg','https://res.cloudinary.com/dcposai6j/image/upload/v1777206602/samples/food/spices.jpg'] } });
  await prisma.post.create({ data: { userId: machiavelli.id, content: 'Государь должен выглядеть так, чтобы внушать уважение прежде, чем откроет рот. Хорошая кожа и быстрый экипаж — не роскошь, а инструмент власти.', images: ['https://res.cloudinary.com/dcposai6j/image/upload/v1777206601/samples/ecommerce/leather-bag-gray.jpg','https://res.cloudinary.com/dcposai6j/image/upload/v1777206601/samples/ecommerce/car-interior-design.jpg'] } });
  await prisma.post.create({ data: { userId: descartes.id, content: 'Cogito, ergo sum — но всё же я задаюсь вопросом: что из этих вещей существует на самом деле, а что лишь в моём воображении? Протяжённость и форма — вот что неопровержимо. Остальное — иллюзия чувств.', images: ['https://res.cloudinary.com/dcposai6j/image/upload/v1777206601/samples/ecommerce/accessories-bag.jpg'] } });

  const senecaPost1 = await prisma.post.create({ data: { userId: seneca.id, content: 'Человек, которого застеклённые окна защищали от малейшего дуновения, подвергается смертельной опасности, даже если его коснётся самый лёгкий ветерок.' } });
  const senecaPost2 = await prisma.post.create({ data: { userId: seneca.id, content: 'Говорят, что Гай Цезарь отличался помимо прочих немалочисленных своих пороков каким-то удивительным сладострастием в оскорблениях.' } });
  const senecaPost3 = await prisma.post.create({ data: { userId: seneca.id, content: 'Измени своё мнение, если оно ошибочно.' } });
  const epictetusPost1 = await prisma.post.create({ data: { userId: epictetus.id, content: 'Не тот беден, кто имеет мало, а тот, кто хочет иметь больше.' } });
  const epictetusPost2 = await prisma.post.create({ data: { userId: epictetus.id, content: 'Познай самого себя.' } });
  const caligulaPost1 = await prisma.post.create({ data: { userId: caligula.id, content: 'Счастье вашей жизни зависит от качества ваших мыслей.' } });
  const descartesPost1 = await prisma.post.create({ data: { userId: descartes.id, content: 'Cogito, ergo sum. Мыслю, следовательно, существую.' } });
  const descartesPost2 = await prisma.post.create({ data: { userId: descartes.id, content: 'Чтобы найти истину, необходимо хоть раз в жизни усомниться во всём, насколько это возможно.' } });
  const humePost1 = await prisma.post.create({ data: { userId: hume.id, content: 'Привычка — великий руководитель в человеческой жизни. Только она делает наш опыт полезным.' } });
  const humePost2 = await prisma.post.create({ data: { userId: hume.id, content: 'Разум есть и должен быть лишь рабом страстей.' } });
  const lockePost1 = await prisma.post.create({ data: { userId: locke.id, content: 'Все люди по природе равны и свободны. Никто не может лишить другого жизни, здоровья, свободы или собственности.' } });
  const lockePost2 = await prisma.post.create({ data: { userId: locke.id, content: 'Ум подобен чистому листу — опыт пишет на нём.' } });
  const leibnizPost1 = await prisma.post.create({ data: { userId: leibniz.id, content: 'Мы живём в лучшем из возможных миров.' } });
  const leibnizPost2 = await prisma.post.create({ data: { userId: leibniz.id, content: 'Настоящее чревато будущим, а прошлое присутствует в настоящем.' } });
  const machiavelliPost1 = await prisma.post.create({ data: { userId: machiavelli.id, content: 'Лучше, чтобы тебя боялись, чем любили — если уж нельзя совместить и то и другое.' } });
  const machiavelliPost2 = await prisma.post.create({ data: { userId: machiavelli.id, content: 'Цель оправдывает средства, но не всегда оправдывает того, кто их выбрал.' } });
  const montesquieuPost1 = await prisma.post.create({ data: { userId: montesquieu.id, content: 'Чтобы не злоупотребляли властью, необходим такой порядок вещей, при котором различные власти могли бы взаимно сдерживать друг друга.' } });
  const montesquieuPost2 = await prisma.post.create({ data: { userId: montesquieu.id, content: 'Свобода есть право делать всё, что дозволено законами.' } });
  const rousseauPost1 = await prisma.post.create({ data: { userId: rousseau.id, content: 'Человек рождается свободным, но повсюду он в оковах.' } });
  const rousseauPost2 = await prisma.post.create({ data: { userId: rousseau.id, content: 'Природа создала человека счастливым и добрым, но общество искажает его и делает несчастным.' } });
  const voltairePost1 = await prisma.post.create({ data: { userId: voltaire.id, content: 'Я не согласен с тем, что вы говорите, но готов умереть за ваше право это говорить.' } });
  const voltairePost2 = await prisma.post.create({ data: { userId: voltaire.id, content: 'Здравый смысл — не такая уж распространённая вещь.' } });

  const posts = [senecaPost1, senecaPost2, senecaPost3, epictetusPost1, epictetusPost2, caligulaPost1, descartesPost1, descartesPost2, humePost1, humePost2, lockePost1, lockePost2, leibnizPost1, leibnizPost2, machiavelliPost1, machiavelliPost2, montesquieuPost1, montesquieuPost2, rousseauPost1, rousseauPost2, voltairePost1, voltairePost2];

  const philosophers = [
    seneca,
    epictetus,
    caligula,
    descartes,
    hume,
    locke,
    leibniz,
    machiavelli,
    montesquieu,
    rousseau,
    voltaire,
  ];

  const likeData: { userId: number; postId: number }[] = [];
  for (const post of posts) {
    const liked = new Set<number>();
    const count = 2 + Math.floor(Math.random() * 5);
    while (liked.size < count) {
      const candidate =
        philosophers[Math.floor(Math.random() * philosophers.length)];
      if (candidate.id !== post.userId) liked.add(candidate.id);
    }
    liked.forEach((userId) => likeData.push({ userId, postId: post.id }));
  }
  await prisma.like.createMany({ data: likeData });

  await prisma.comment.createMany({
    data: [
      {
        userId: epictetus.id,
        postId: senecaPost1.id,
        content: 'Мудро сказано, друг.',
      },
      {
        userId: caligula.id,
        postId: senecaPost1.id,
        content: 'Очень актуально в наше время.',
      },
      {
        userId: descartes.id,
        postId: senecaPost3.id,
        content: 'Сомнение — путь к истине.',
      },
      {
        userId: voltaire.id,
        postId: senecaPost2.id,
        content: 'Тираны во все времена одинаковы.',
      },
      {
        userId: seneca.id,
        postId: epictetusPost1.id,
        content: 'Согласен на 100%.',
      },
      {
        userId: machiavelli.id,
        postId: epictetusPost1.id,
        content: 'Богатство — иллюзия власти.',
      },
      {
        userId: locke.id,
        postId: epictetusPost2.id,
        content: 'Самопознание начинается с опыта.',
      },
      {
        userId: rousseau.id,
        postId: caligulaPost1.id,
        content: 'Качество мыслей определяет свободу.',
      },
      {
        userId: hume.id,
        postId: descartesPost1.id,
        content: 'А существует ли это самое «я»?',
      },
      {
        userId: leibniz.id,
        postId: descartesPost1.id,
        content: 'Гениально и просто.',
      },
      {
        userId: epictetus.id,
        postId: descartesPost2.id,
        content: 'Сомнение очищает разум.',
      },
      {
        userId: locke.id,
        postId: humePost1.id,
        content: 'Опыт — источник всякого знания.',
      },
      {
        userId: descartes.id,
        postId: humePost2.id,
        content: 'Тут я с вами поспорю, Дэвид.',
      },
      {
        userId: voltaire.id,
        postId: lockePost1.id,
        content: 'Это и есть основа свободы.',
      },
      {
        userId: rousseau.id,
        postId: lockePost1.id,
        content: 'А оковы общества тогда откуда?',
      },
      {
        userId: hume.id,
        postId: lockePost2.id,
        content: 'Чистый эмпиризм. Поддерживаю.',
      },
      {
        userId: voltaire.id,
        postId: leibnizPost1.id,
        content: 'Лучший из миров? Сомневаюсь.',
      },
      {
        userId: descartes.id,
        postId: leibnizPost2.id,
        content: 'Время — забавная вещь.',
      },
      {
        userId: caligula.id,
        postId: machiavelliPost1.id,
        content: 'Истина власти.',
      },
      {
        userId: seneca.id,
        postId: machiavelliPost2.id,
        content: 'Цель не всегда оправдывает дорогу.',
      },
      {
        userId: locke.id,
        postId: montesquieuPost1.id,
        content: 'Разделение властей — это будущее.',
      },
      {
        userId: rousseau.id,
        postId: montesquieuPost2.id,
        content: 'Свобода рождается в законах.',
      },
      {
        userId: voltaire.id,
        postId: rousseauPost1.id,
        content: 'Жан-Жак, ты опять за своё.',
      },
      {
        userId: hume.id,
        postId: rousseauPost2.id,
        content: 'Природа сама по себе нейтральна.',
      },
      {
        userId: leibniz.id,
        postId: voltairePost1.id,
        content: 'Вольтер всегда найдёт что сказать.',
      },
      {
        userId: epictetus.id,
        postId: voltairePost2.id,
        content: 'Здравый смысл — это работа.',
      },
    ],
  });

  await prisma.follow.createMany({
    data: [
      { followerId: user.id, followingId: seneca.id },
      { followerId: user.id, followingId: epictetus.id },
      { followerId: user.id, followingId: descartes.id },
      { followerId: seneca.id, followingId: epictetus.id },
      { followerId: epictetus.id, followingId: seneca.id },
      { followerId: caligula.id, followingId: seneca.id },
      { followerId: descartes.id, followingId: hume.id },
      { followerId: hume.id, followingId: locke.id },
      { followerId: locke.id, followingId: hume.id },
      { followerId: leibniz.id, followingId: descartes.id },
      { followerId: machiavelli.id, followingId: caligula.id },
      { followerId: montesquieu.id, followingId: locke.id },
      { followerId: rousseau.id, followingId: voltaire.id },
      { followerId: voltaire.id, followingId: rousseau.id },
      { followerId: voltaire.id, followingId: leibniz.id },
    ],
  });
}

main()
  .catch((error) => {
    console.error('Ошибка при генерации данных:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
