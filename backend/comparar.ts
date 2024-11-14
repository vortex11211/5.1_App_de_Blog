export const getPublicationByIdController = async (req: Request, res: Response) => {
    try {
        const { publicationId } = req.params;
        console.log('req.params:', req.params);

        // Validar si publicationId es un número válido
        if (!publicationId || isNaN(Number(publicationId))) {
            return res.status(400).json({ message: 'Invalid publication ID' });
        }

        const parsedPublicationId = parseInt(publicationId, 10);
        console.log('Parsed publicationId:', parsedPublicationId);

        const dto: GetPublicationByIdDTO = { publicationId: parsedPublicationId };
        const getPublicationByIdUseCase = new GetPublicationByIdUseCase(publicationRepository);
        const publication = await getPublicationByIdUseCase.execute(dto);

        if (publication) {
            res.status(200).json(publication);
        } else {
            res.status(404).json({ message: 'Publication not found' });
        }
    } catch (error) {
        const typedError = error as Error;
        res.status(500).json({ message: 'Error al obtener la publicación', error: typedError.message });
    }
};
