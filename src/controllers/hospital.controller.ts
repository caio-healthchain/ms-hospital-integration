import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { ApiResponse, PaginatedResponse } from '@/types';

/**
 * @swagger
 * components:
 *   schemas:
 *     Hospital:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do hospital
 *         name:
 *           type: string
 *           description: Nome do hospital
 *         status:
 *           type: string
 *           enum: [active, inactive, pending]
 *           description: Status do hospital
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data de atualização
 *       required:
 *         - id
 *         - name
 *         - status
 *     CreateHospitalRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do hospital
 *         status:
 *           type: string
 *           enum: [active, inactive, pending]
 *           description: Status inicial
 *       required:
 *         - name
 *     UpdateHospitalRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do hospital
 *         status:
 *           type: string
 *           enum: [active, inactive, pending]
 *           description: Status do hospital
 */

export class HospitalController extends BaseController {
  
  /**
   * @swagger
   * /api/v1/hospitals:
   *   get:
   *     summary: Listar hospitals
   *     description: Retorna uma lista paginada de hospitals
   *     tags:
   *       - Hospitals
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *           default: 1
   *         description: Número da página
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *           default: 20
   *         description: Itens por página
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *         description: Termo de busca
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [active, inactive, pending]
   *         description: Filtrar por status
   *     responses:
   *       200:
   *         description: Lista de hospitals recuperada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               allOf:
   *                 - $ref: '#/components/schemas/ApiResponse'
   *                 - type: object
   *                   properties:
   *                     data:
   *                       $ref: '#/components/schemas/PaginatedResponse'
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  async list(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const search = req.query.search as string;
      const status = req.query.status as string;

      // Simular dados para demonstração
      const mockData = Array.from({ length: limit }, (_, i) => ({
        id: `hospital-${(page - 1) * limit + i + 1}`,
        name: `Hospital ${(page - 1) * limit + i + 1}`,
        status: ['active', 'inactive', 'pending'][i % 3],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      const response: ApiResponse<PaginatedResponse<any>> = {
        success: true,
        message: 'Hospitals retrieved successfully',
        data: {
          items: mockData,
          pagination: {
            page,
            limit,
            total: 100,
            totalPages: Math.ceil(100 / limit),
            hasNext: page < Math.ceil(100 / limit),
            hasPrev: page > 1,
          },
        },
        timestamp: new Date().toISOString(),
      };

      res.json(response);
    } catch (error) {
      this.sendError(res, 'Failed to retrieve hospitals', 500);
    }
  }

  /**
   * @swagger
   * /api/v1/hospitals/{id}:
   *   get:
   *     summary: Obter hospital por ID
   *     description: Retorna um hospital específico pelo ID
   *     tags:
   *       - Hospitals
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do hospital
   *     responses:
   *       200:
   *         description: Hospital recuperado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               allOf:
   *                 - $ref: '#/components/schemas/ApiResponse'
   *                 - type: object
   *                   properties:
   *                     data:
   *                       $ref: '#/components/schemas/Hospital'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Simular busca por ID
      const mockData = {
        id,
        name: `Hospital ${id}`,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.sendResponse(res, mockData, 'Hospital retrieved successfully');
    } catch (error) {
      this.sendError(res, 'Hospital not found', 404);
    }
  }

  /**
   * @swagger
   * /api/v1/hospitals:
   *   post:
   *     summary: Criar novo hospital
   *     description: Cria um novo hospital
   *     tags:
   *       - Hospitals
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateHospitalRequest'
   *     responses:
   *       201:
   *         description: Hospital criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               allOf:
   *                 - $ref: '#/components/schemas/ApiResponse'
   *                 - type: object
   *                   properties:
   *                     data:
   *                       $ref: '#/components/schemas/Hospital'
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, status } = req.body;

      // Simular criação
      const mockData = {
        id: `hospital-${Date.now()}`,
        name,
        status: status || 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      res.status(201);
      this.sendResponse(res, mockData, 'Hospital created successfully');
    } catch (error) {
      this.sendError(res, 'Failed to create hospital', 500);
    }
  }

  /**
   * @swagger
   * /api/v1/hospitals/{id}:
   *   put:
   *     summary: Atualizar hospital
   *     description: Atualiza um hospital existente
   *     tags:
   *       - Hospitals
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do hospital
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateHospitalRequest'
   *     responses:
   *       200:
   *         description: Hospital atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               allOf:
   *                 - $ref: '#/components/schemas/ApiResponse'
   *                 - type: object
   *                   properties:
   *                     data:
   *                       $ref: '#/components/schemas/Hospital'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, status } = req.body;

      // Simular atualização
      const mockData = {
        id,
        name: name || `Hospital ${id}`,
        status: status || 'active',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        updatedAt: new Date().toISOString(),
      };

      this.sendResponse(res, mockData, 'Hospital updated successfully');
    } catch (error) {
      this.sendError(res, 'Failed to update hospital', 500);
    }
  }

  /**
   * @swagger
   * /api/v1/hospitals/{id}:
   *   delete:
   *     summary: Excluir hospital
   *     description: Exclui um hospital existente
   *     tags:
   *       - Hospitals
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do hospital
   *     responses:
   *       200:
   *         description: Hospital excluído com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ApiResponse'
   *       404:
   *         $ref: '#/components/responses/NotFound'
   *       500:
   *         $ref: '#/components/responses/InternalServerError'
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Simular exclusão
      this.sendResponse(res, null, 'Hospital deleted successfully');
    } catch (error) {
      this.sendError(res, 'Failed to delete hospital', 500);
    }
  }
}
