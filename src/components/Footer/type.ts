export type FooterListItem = {
    Icon: string;
    title: string;
};

type FooterCardIcon = {
    icon: string;
    count: number;
};

type FooterCardLabel = {
    icon: string;
    label: string;
};

export type FooterCardItem = {
    title: string;
    description: string;
    labels: FooterCardLabel;
    icons: FooterCardIcon[];
};

export type FooterProps = {
    title: string;
    description: string;
    card: FooterCardItem[];
    list: FooterListItem[];
};
